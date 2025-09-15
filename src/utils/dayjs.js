import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Uzbek (Latin)
dayjs.locale("uz", {
    name: "uz",
    relativeTime: {
        future: "%s dan keyin",
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
        yy: "%d yil"
    }
});

// Uzbek (Cyrillic)
dayjs.locale("uzCyrl", {
    name: "uzCyrl",
    relativeTime: {
        future: "%s дан кейин",
        past: "%s аввал",
        s: "бир неча сония",
        m: "1 дақиқа",
        mm: "%d дақиқа",
        h: "1 соат",
        hh: "%d соат",
        d: "1 кун",
        dd: "%d кун",
        M: "1 ой",
        MM: "%d ой",
        y: "1 йил",
        yy: "%d йил"
    }
});

// Russian (ready from dayjs)
import "dayjs/locale/ru";

export default dayjs;
