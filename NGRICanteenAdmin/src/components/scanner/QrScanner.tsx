// import {Html5QrcodeScanner} from "html5-qrcode";
// import { useEffect } from "react";

// interface Props{
//     onScanSuccess:(text:string)=>void;
// }

// export default function QrScanner({
//     onScanSuccess,

// }:Props){
//     useEffect(()=>{
//         const scanner=new Html5QrcodeScanner(
//             "reader",
//             {
//                 fps:10,
//                 qrbox:{
//                     width:250,
//                     height:250,
//                 },
//             },
//             false
//         );
//         scanner.render(
//             (decodeText)=>{
//                 scanner.clear();
//                 onScanSuccess(decodeText);
//             },
//             ()=>{}
//         );
//         return ()=>{
//             scanner.clear().catch(()=>{});
//         };
//     },[]);
//     return <div id="reader"/>;
// }
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

interface Props {
  onScanSuccess: (text: string) => Promise<void> | void;
  cameraId: string;
  onTorchSupport?: (supported: boolean) => void;
  torchEnabled?: boolean;
}

export default function QrScanner({
  onScanSuccess,
  cameraId,
  onTorchSupport,
  torchEnabled,
}: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanning = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          cameraId,
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },

          async (decodedText) => {
            if (isScanning.current) return;

            isScanning.current = true;

            try {
              await scanner.pause();

              await onScanSuccess(decodedText);

              // Show success card for 2 seconds
              setTimeout(async () => {
                isScanning.current = false;

                try {
                  await scanner.resume();
                } catch (e) {
                  console.error(e);
                }
              }, 2000);
            } catch (e) {
              isScanning.current = false;

              try {
                await scanner.resume();
              } catch {}
            }
          },
          () => {},
        );
      } catch (err) {
        console.error("Scanner failed to start", err);
      }
      try {
        const capabilities = scanner.getRunningTrackCapabilities() as any;

        if (capabilities.torch) {
          onTorchSupport?.(true);
        } else {
          onTorchSupport?.(false);
        }
      } catch {
        onTorchSupport?.(false);
      }
    };

    startScanner();

    return () => {
      if (scanner.isScanning) {
        scanner.stop().catch(() => {});
      }
    };
  }, [cameraId]);
  useEffect(() => {
    if (!scannerRef.current) return;

    async function updateTorch() {
      try {
        await scannerRef.current?.applyVideoConstraints({
          advanced: [
            {
              torch: torchEnabled,
            } as any,
          ],
        });
      } catch {
        // Ignore if unsupported
      }
    }

    updateTorch();
  }, [torchEnabled]);

  return <div id="reader" className="rounded-lg overflow-hidden border" />;
}
