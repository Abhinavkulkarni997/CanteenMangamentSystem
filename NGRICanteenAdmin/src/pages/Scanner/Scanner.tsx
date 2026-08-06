import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";

import QrScanner from "../../components/scanner/QrScanner";
import { useVerifyQr } from "../../hooks/useVerifyQr";
import { useCollectOrder } from "../../hooks/useCollectOrder";

import type { ScannedOrder, ScanHistoryItem } from "../../types/scanner";
// import type { ScanHistoryItem } from "../../types/scanner";

import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import type { CameraDevice } from "../../types/camera";
import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
// import { successSound, errorSound } from "../../utils/scannerSound";
import {
  playSuccessFeedback,
  playErrorFeedback,
} from "../../utils/scannerFeedback";
import type { AxiosError } from "axios";

export default function Scanner() {
  const [lastOrder, setLastOrder] = useState<ScannedOrder | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [cameraId, setCameraId] = useState("");
  const [torchSupported, setTorchSupported] = useState(false);

  const [torchEnabled, setTorchEnabled] = useState(false);

  const [scannerStatus, setScannerStatus] = useState<
    "READY" | "VERIFYING" | "COLLECTING"
  >("READY");

  const verifyQr = useVerifyQr();
  const collectOrder = useCollectOrder();

  const lastToken = useRef("");
  useEffect(() => {
    async function loadCameras() {
      try {
        const devices = await Html5Qrcode.getCameras();

        const formatted = devices.map((camera, index) => ({
          id: camera.id,
          label: camera.label || `Camera ${index + 1}`,
        }));

        setCameras(formatted);

        if (formatted.length > 0) {
          setCameraId(formatted[0].id);
        }
      } catch (err) {
        console.error(err);
        toast.error("Unable to load cameras");
      }
    }

    loadCameras();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">QR Scanner</h1>
      <Select value={cameraId} onValueChange={setCameraId}>
        <SelectTrigger className="w-[320px]">
          <SelectValue placeholder="Select Camera" />
        </SelectTrigger>

        <SelectContent>
          {cameras.map((camera) => (
            <SelectItem key={camera.id} value={camera.id}>
              {camera.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {torchSupported && (
        <Button variant="outline" onClick={() => setTorchEnabled((v) => !v)}>
          {torchEnabled ? " Flash OFF" : " Flash ON"}
        </Button>
      )}
      {cameraId && (
        <QrScanner
          cameraId={cameraId}
          torchEnabled={torchEnabled}
          onTorchSupport={setTorchSupported}
          onScanSuccess={async (token) => {
            // Prevent duplicate scans
            if (lastToken.current === token) return;

            lastToken.current = token;

            return new Promise<void>((resolve) => {
              setScannerStatus("VERIFYING");

              verifyQr.mutate(token, {
                onSuccess: (response) => {
                  const order = response.data.data;

                  setScannerStatus("COLLECTING");

                  collectOrder.mutate(order.id, {
                    onSuccess: async () => {
                      setLastOrder({
                        ...order,
                        orderStatus: "COLLECTED",
                      });
                      const historyItem: ScanHistoryItem = {
                        ...order,
                        orderStatus: "COLLECTED",
                        scannedAt: new Date().toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }),
                      };

                      setScanHistory((prev) => [
                        historyItem,
                        ...prev.slice(0, 9),
                      ]);

                      toast.success("Meal Collected");
                      await playSuccessFeedback();

                      setScannerStatus("READY");

                      setTimeout(() => {
                        setLastOrder(null);
                        lastToken.current = "";
                        resolve();
                      }, 2000);
                    },

                    onError: async (error: AxiosError<any>) => {
                      lastToken.current = "";
                      setScannerStatus("READY");

                      toast.error(
                        error.response?.data?.message ?? "Collection Failed",
                      );
                      await playErrorFeedback();

                      resolve();
                    },
                  });
                },

                onError: async (error: AxiosError<any>) => {
                  lastToken.current = "";
                  setScannerStatus("READY");

                  toast.error(error.response?.data?.message ?? "Invalid QR");
                  await playErrorFeedback();

                  resolve();
                },
              });
            });
          }}
        />
      )}

      {/* Scanner Status */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Scanner Status</span>

            <Badge
              className={
                scannerStatus === "READY"
                  ? "bg-green-600"
                  : scannerStatus === "VERIFYING"
                    ? "bg-yellow-600"
                    : "bg-blue-600"
              }
            >
              {scannerStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {lastOrder ? (
        <Card className="border-green-500 bg-green-50">
          <CardContent className="space-y-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />

                <h2 className="text-xl font-bold text-green-700">
                  Meal Collected
                </h2>
              </div>

              <Badge className="bg-green-600">{lastOrder.orderStatus}</Badge>
            </div>

            <Separator />

            <div className="grid gap-3">
              <p>
                <strong>{lastOrder.user.name}</strong>
              </p>

              <p>{lastOrder.user.employeeId}</p>

              <p>{lastOrder.orderNumber}</p>

              <p>₹{lastOrder.totalAmount}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground text-lg">
              Ready for next scan...
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="py-4">
          <div className="flex justify-between">
            <span>Meals Served Today</span>

            <span className="text-2xl font-bold">{scanHistory.length}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-5">
          <h2 className="font-semibold text-lg mb-4">Today's Scans</h2>

          {scanHistory.length === 0 ? (
            <p className="text-muted-foreground">No scans yet</p>
          ) : (
            <div className="space-y-3">
              {scanHistory.map((scan) => (
                <div
                  key={scan.orderNumber}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{scan.user.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {scan.user.employeeId}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge className="bg-green-600">COLLECTED</Badge>

                    <p className="text-xs mt-1">{scan.scannedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
