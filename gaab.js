var tester = {};

tester.tests = {};
tester.testId = 1;

tester.setupTest = function(name, opts) {
  var hypothesis = {
    name : name
  };

  hypothesis.testId = 0;
  if(typeof tester.tests[name] !== 'undefined') {
    hypothesis.testId = tester.tests[name];
  } else {
    hypothesis.testId = tester.testId;
    tester.tests[name] = tester.testId;
    tester.testId++;
  }

  // random number between 0 and 100
  var rand = Math.floor(Math.random() * 101);

  var chance = 0;

  for(var i = 0; i < opts.length; i++) {
    chance += opts[i].chance;
    if(rand < chance) {
      hypothesis.option = opts[i].name;
      break;
    }
  }

  // Async google analytics code
  hypothesis.gacode =
    "<script type='text/javascript'>" +
    "_gaq.push(['_setCustomVar', " +
                hypothesis.testId + ", 'Test: " +
                hypothesis.name + "', '" +
                hypothesis.option + "', 1]);" +
    "</script>";

  return hypothesis;
};

module.exports = tester;