import {View,Text,StyleSheet} from "react-native";
interface Props{
    status:"BOOKED" | "COLLECTED" | "CANCELLED";

}

export default function StatusBadge({status}:Props){
    const getBackgroundColor=()=>{
        switch (status){
            case "BOOKED":
                return "#FFF8E1";

            case "COLLECTED":
                return "#E8F5E9";

            case "CANCELLED":
                return "#FDECEA";
            
            default:
                return "#EEEEEE";
            
        }
    }

    const getTextColor=()=>{
        switch(status){
            case "BOOKED":
                return "#FF9800";
            case "COLLECTED":
                return "#2E7D32";
            case "CANCELLED":
                return "#D32F2F";
            default:
                return "#555";
        }
    };


    return(
        <View style={[styles.badge,
            {
                backgroundColor: getBackgroundColor(),
            },
        ]}>
            <Text 
            style={[
                styles.text,
                {
                color:getTextColor(),
                },
            ]}>
                {status}
            </Text>
        </View>
    );
};

const styles=StyleSheet.create({
    badge:{
        paddingHorizontal:12,
        paddingVertical:6,
        borderRadius:20,
        alignSelf:"flex-start",

    },
    text:{
        fontWeight:"700",
        fontSize:12,
    },

})