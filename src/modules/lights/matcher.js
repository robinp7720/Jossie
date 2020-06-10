export default {
    async match(text, last) {
        let regions = [];

        if (text.includes('main')) {
            regions.push(2);

            if (text.includes('lights')) {
                regions.push(1);
            }
        }

        if (text.includes('secondary')) {
            regions.push(1);
        }

        if (text.includes('bed') || text.includes('night')) {
            regions.push(3);
        }

        if (text.includes('wardrobe')) {
            regions.push(4);
        }

        if (text.includes('all')) {
            regions = [1, 2, 3, 4];
        }

        if (regions.length === 0) {
            regions = [1, 2, 3, 4];
        }

        if (text.includes('light') && ((text.includes('turn') && text.includes('off')) || last.action === 'turn off')) {
            return {
                'topic': 'lights',
                action: 'turn off',
                modifiers: {
                    regions
                }
            };
        } else if (text.includes('light') && ((text.includes('turn') && text.includes('on')) || last.action === 'turn on')) {
            return {
                'topic': 'lights',
                action: 'turn on',
                modifiers: {
                    regions
                }
            };
        } else if (text.includes('dim') ) {
            return {
                'topic': 'lights',
                action: 'dim',
                modifiers: {
                    regions
                }
            };
        } else if (text.includes('set') && text.includes('brightness')) {
            let value = parseInt(text.match(/\d+/g)[0]);

            return {
                'topic': 'lights',
                action: 'set',
                modifiers: {
                    subject: 'brightness',
                    value,
                    regions
                }
            };
        }
    }
};
