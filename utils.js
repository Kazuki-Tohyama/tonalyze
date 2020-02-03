const Note = require('@tonaljs/note');

const utils = {
  build_callback_data(message) {
    const json = {
      fulfillmentText: message,
    };
    return json;
  },
  isContainsRootNote(root) {
    const noteNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return noteNames.find(el => root.includes(el));
  },
  changeToEn(name) {
    if (name === 'メジャー' || name === 'イオニアン') {
      return 'major';
    }
    if (name === 'マイナー') {
      return 'minor';
    }
    if (name === 'エオリアン') {
      return 'aeolian';
    }
    if (name === 'リディアン') {
      return 'lydian';
    }
    if (name === 'ロクリアン') {
      return 'locrian';
    }
    if (name === 'ミクソリディアン') {
      return 'mixolydian';
    }
    if (name === 'フリジアン') {
      return 'phrygian';
    }
    if (name === 'ドリアン') {
      return 'dorian';
    }
    if (name === 'メロディックマイナー') {
      return 'melodic minor';
    }
    if (name === 'ハーモニックマイナー') {
      return 'harmonic minor';
    }
    if (name === 'トライアド') {
      return 'triad';
    }
    if (name === 'テトラッド') {
      return 'tetrad';
    }
    return name;
  },
  reduceRootName(root) {
    const adjustedRoot = root.reduce((acc, cur) => {
			if (cur === '♭') {
				cur = 'b';
			}
      return `${acc}${cur}`;
    });
    return adjustedRoot;
  },
  rootNameToJp(root) {
    let adjustedRoot = root;
    if (adjustedRoot.includes('#')) {
      return adjustedRoot.replace('#', 'シャープ');
    } else if (adjustedRoot.includes('b')) {
      return adjustedRoot.replace('b', 'フラット');
    }
    return adjustedRoot;
  },
  enharmonizeChords(chordList) {
    const enharmonicableNotes = ['B#', 'E#', 'Fb', 'Cb'];
    return chordList.map(chord => {
      const enharmonicNote = enharmonicableNotes.find(el => {return chord.indexOf(el) > 0;});
      if (enharmonicNote) {
        return chord.replace(enharmonicNote, Note.enharmonic(enharmonicNote));
      }
      return chord;
    });
  },
  buildTextFromNote(text) {
    let buildText = text;
    buildText = buildText.replace('dim', 'ディミニッシュ');
    buildText = buildText.replace('aug', 'オーギュメント');
    buildText = buildText.replace('b', 'フラット');
    buildText = buildText.replace('#', 'シャープ');
    buildText = buildText.replace('Maj', 'メジャー');
    buildText = buildText.replace('M', 'メジャー');
    buildText = buildText.replace('m', 'マイナー');
    buildText = buildText.replace('5', 'ファイブ');
    buildText = buildText.replace('6', 'シックスス');
    buildText = buildText.replace('7', 'セブンス');
    buildText = buildText.replace('9', 'ナインス');
    buildText = buildText.replace('11', 'イレブンス');
    buildText = buildText.replace('13', 'サーティーンス');
    return buildText;
  },
  buildChordSpeechTextFromList(list) {
    const listToJp = list.map(elm => {
      let chord = elm;
      chord = chord.replace('dim', 'ディミニッシュ');
      chord = chord.replace('aug', 'オーギュメント');
      chord = chord.replace('b', 'フラット');
      chord = chord.replace('#', 'シャープ');
      chord = chord.replace('Maj', 'メジャー');
      chord = chord.replace('M', 'メジャー');
      chord = chord.replace('m', 'マイナー');
      chord = chord.replace('5', 'ファイブ');
      chord = chord.replace('6', 'シックスス');
      chord = chord.replace('7', 'セブンス');
      chord = chord.replace('9', 'ナインス');
      chord = chord.replace('11', 'イレブンス');
      chord = chord.replace('13', 'サーティーンス');
      return chord;
    });
    return listToJp.join('、');
  },
};

module.exports = utils;
