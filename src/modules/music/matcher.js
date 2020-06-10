import textAnalysis from '../../lib/textAnalysis';

module.exports = {
    module: 'music',
    async match(text, analysis) {
        let doc = new textAnalysis(text);
        let subject = doc.firstFrom(['track', 'song', 'music']);
        let subjectCompliment = doc.firstFrom(['name', 'length', 'bitrate', 'duration', 'id', 'volume', 'artist', 'bitrate']);


        if (text === 'play the first track') {
            return {
                topic: 'music',
                action: 'play',
                ignoreDelay: true,
                modifiers: {
                    det: 'the',
                    amod: 'first',
                    pobj: 'track'
                }
            }
        } else if (doc.before(['skip', 'next'], ['track', 'song', 'music'])) {
            return {
                topic: 'music',
                action: 'next'
            };
        } else if (doc.before(['clear'], ['queue', 'playlist']) ||
            (text.includes('remove everything') && (text.includes('queue') || text.includes('playlist')))) {
            return {
                topic: 'music',
                action: 'clear'
            };
        } else if (doc.before(['remove'], ['everything']) && (text.includes('queue') || text.includes('playlist'))) {
                return {
                    topic: 'music',
                    action: 'remove',
                    modifiers: {
                        dobj: 'everything'
                    }
                };
        } else if (text.includes('play some') ||
            text.includes('play music by') ||
            text.includes('add music from') ||
            text.includes('add music by')
        ) {
            text = text.replace('play some music by', '')
                .replace('play some', '')
                .replace('play music by', '')
                .replace('play music by the artist', '')
                .replace('add music by', '')
                .replace('add music from', '')
                .replace('to playlist', '')
                .replace('to the playlist', '');

            return {
                topic: 'music',
                action: 'searchadd',
                modifiers: {
                    artist: text.trim().toLowerCase()
                }
            };
        } else if (doc.before(['set', 'make'], ['volume', 'audio'])) {
            return {
                topic: 'music',
                action: 'set',
                modifiers: {
                    subject: 'volume',
                    value: parseInt(text.match(/\d+/g)[0])
                }
            };
        } else if (text.includes('volume') && text.includes('turn') && text.includes('up')) {
            let value = parseInt(text.match(/\d+/g)[0]);

            return {
                topic: 'music',
                action: 'turn up',
                modifiers: {
                    subject: 'volume',
                    value
                }
            };
        } else if (text.includes('volume') && text.includes('increase')) {
            let value = parseInt(text.match(/\d+/g)[0]);

            return {
                topic: 'music',
                action: 'increase',
                modifiers: {
                    subject: 'volume',
                    value
                }
            };
        } else if (text.includes('volume') && text.includes('reduce')) {
            let value = parseInt(text.match(/\d+/g)[0]);

            return {
                topic: 'music',
                action: 'reduce',
                modifiers: {
                    subject: 'volume',
                    value
                }
            };
        } else if (text.includes('volume') && text.includes('decrease')) {
            let value = parseInt(text.match(/\d+/g)[0]);

            return {
                topic: 'music',
                action: 'decrease',
                modifiers: {
                    subject: 'volume',
                    value
                }
            };
        } else if (text.includes('volume') && text.includes('turn') && text.includes('down')) {
            let value = parseInt(text.match(/\d+/g)[0]);

            return {
                topic: 'music',
                action: 'turn down',
                modifiers: {
                    subject: 'volume',
                    value
                }
            };
        } else if (doc.before(['remove', 'delete'], ['track', 'song', 'music'])) {
            return {
                topic: 'music',
                action: 'remove',
                modifiers: {
                    dobj: doc.firstFrom(['track', 'song', 'music']),
                }
            };
        } else if (doc.before(['what'], ['is']) && subject && subjectCompliment) {
            return {
                topic: 'music',
                action: 'is',
                ignoreDelay: true,
                modifiers: {
                    pronoun: 'what',
                    subject,
                    subjectCompliment
                }
            }
        } else if (text === 'go to the first track') {
            return {
                topic: 'music',
                action: 'go',
                ignoreDelay: true,
                modifiers: {
                    prep: 'to',
                    det: 'the',
                    amod: 'first',
                    pobj: 'track'
                }
            }
        }

            // Play an individual song
            // This should match statements such as :
        // Play I can see clearly now by Johnny Nash
        else if (text.match(/play music by (.+)/)) {
            let match = text.match(/play music by (.+)/);

            if (!match[1])
                return

            return {
                topic: 'music',
                action: 'searchadd',
                modifiers: {
                    artist: match[1]
                }
            }
        }

        else if (text.match(/play some music by (.+)/)) {
            let match = text.match(/play some music by (.+)/);

            if (!match[1])
                return

            return {
                topic: 'music',
                action: 'searchadd',
                modifiers: {
                    artist: match[1]
                }
            }
        }

            // Play an individual song
            // This should match statements such as :
        // Play I can see clearly now by Johnny Nash
        else if (text.match(/play (.+) by (.+)/)) {
            let match = text.match(/play (.+) by (.+)/);

            if (!match[1] || !match[2])
                return

            return {
                topic: 'music',
                action: 'searchadd',
                modifiers: {
                    song: match[1],
                    artist: match[2]
                }
            }

        }

        else if (doc.before(['pause'], ['music', 'track', 'song']) && !(text.includes('by'))) {
            return {
                topic: 'music',
                action: 'pause'
            };
        }  else if (doc.before(['resume', 'play', 'start', 'review'], ['music', 'track', 'song'])) {
            return {
                topic: 'music',
                action: 'resume'
            };
        }

    }

};

