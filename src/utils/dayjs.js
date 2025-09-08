import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

dayjs.locale("uz", {
    name: "uz",
    relativeTime: {
        future: " %s dan keyin",
        past: "%s avval",
        s: "bir necha soniya",
        m: "1 daqiqa",
        mm: "%d daqiqa",
        h: "1 soat",
        hh: "%d soat",
        d: "1 kun",
        dd: "%d kun",
        M: "1 oy",
        MM: "%d oy",
        y: "1 yil",
        yy: "%d yil",
    },
});

export default dayjs;