import MiLight from 'milight'

let milight = new MiLight({
    host: '192.168.178.255',
    broadcast: true
});

export default {
    on: (regions) => {
        milight.zone(regions).on();
        milight.zone(regions).on();
        milight.zone(regions).on();
        milight.zone(regions).on();
    },

    off: (regions) => {
        milight.zone(regions).off();
        milight.zone(regions).off();
        milight.zone(regions).off();
        milight.zone(regions).off();
    },

    brightness: (regions, brightness) => {
        milight.zone(regions).brightness(brightness);
        milight.zone(regions).brightness(brightness);
        milight.zone(regions).brightness(brightness);
        milight.zone(regions).brightness(brightness);
    }
}
