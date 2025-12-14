import badusha from "../assets/sweets/badusha.jpg";
import laddu from "../assets/sweets/laddu.jpg";
import jalebi from "../assets/sweets/jalebi.jpg";
import gulabjamun from "../assets/sweets/gulabjamun.jpg";
import mysorepak from "../assets/sweets/mysorepak.jpg";
import defaultImg from "../assets/sweets/default.jpg";

const imageMap: Record<string, string> = {
    badusha,
    laddu,
    jalebi,
    "gulab jamun": gulabjamun,
    mysorepak,
};

export const getSweetImage = (name: string) => {
    return imageMap[name.toLowerCase()] || defaultImg;
};
