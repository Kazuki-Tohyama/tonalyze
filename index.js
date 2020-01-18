exports.handler = async (event, context, callback) => {
  const DiatonicIntent = require('./intents/diatonic.js');
  const ScaleElementsIntent = require('./intents/scaleElements.js');

  const { intent, parameters } = event.queryResult;

  console.log(event.queryResult);

  switch(intent.displayName) {
    case "scaleElements":
      ScaleElementsIntent(parameters, callback);
      break;
    case "diatonic":
      DiatonicIntent(parameters, callback);
      break;
    default:
      break;
  }
};
