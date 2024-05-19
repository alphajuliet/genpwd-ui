// GenPwd.js

//---------------------------------
// Namespace: GenPwd

var GenPwd = GenPwd || {};
GenPwd = (() => {

  // Application metadata
  const Info = {
    name: "GenPwd",
    author: "AndrewJ",
    version: "3.0.1",
    date: "2021-06-26",
    info: "GenPwd is a simple password generator.",
    appendTo: function (tagName) {
      let str = "<div>";
      str += "<span class='title'>" + this.name + "</span>";
      str += "&nbsp;<span class='description'>v" + this.version + "</span>";
      str += "</div>";
      $(tagName).append(str);
    },
    aboutText: function () {
      let str = this.name + " v" + this.version;
      str += ", last modified: " + this.date;
      str += " by: " + this.author + ".\n\n";
      str += this.info;
      return str;
    }
  };

  //---------------------------------
  // const api_root = "https://alphajuliet.api.stdlib.com/genpwd/";
  const api_root = "https://bo1j45kbnb.execute-api.us-east-1.amazonaws.com"

  async function initialise_generators() {
    // Retrieve available generators
    const url = `${api_root}/generators`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      referrer: 'no-referrer', // no-referrer, *client
    })
    const generators = await response.json()
    console.log(generators);
    let fn;
    generators.generators.forEach((gen) => {
      if (gen.default == true)
        fn = `'${gen.id}' selected`;
      else
        fn = `${gen.id}`
      $('#generator').append($(`<option value=${fn}>${gen.name}</option>`));
    });
  };

  const initialise_strengths = () => {
    const strengths = [ "Simple", "Medium", "Strong" ];
    strengths.forEach((s, i) => {
      //$('#strength').append($(`<option value="${i}">${s}</option>`))
      const checked = (i == 0) ? 'checked="checked"' : '';
      let lbl = $('<label></label>')
          .append($(`<input type="radio" name="strength" id="rb${i}" value="${i}" ${checked}>`))
          .append(s)
      $('#ctrl-strength').append(lbl);
    });
  };

  // Display the app info, and populate the list of available generators.
  const initialise = () => {
    Info.appendTo("header");
    initialise_generators();
    initialise_strengths();
  };

  //---------------------------------
  // Call the Genpwd FaaS web service
  async function randomWords(genId, strength, nwords, punctuation, capitals, numbers) {
    const args = `genId=${genId}&strength=${strength}&nwords=${nwords}&punctuation=${punctuation}&capitals=${capitals}&numbers=${numbers}`;
    const url = `${api_root}/generate?${args}`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      referrer: 'no-referrer', // no-referrer, *client
    })
    const words = await response.json();
    return words;
  };

  // Main function to generate a list of random words, based on the chosen generator.
  const generate = (target, genId, strength, opts) => {
    const nwords = 10
    const punctuation = opts.punctuation ? 1 : 0
    const capitals = opts.capitals ? 1 : 0
    const numbers = opts.numbers ? 1 : 0
    
    randomWords(genId, strength, nwords, punctuation, capitals, numbers)
      .then(data => {
        $(output).empty();
        R.forEach( (i) => {
          $(target)
            .append($("<div class='word'></div>")
                    .append(data[i]))
        }, R.range(0, nwords))
      })
      .catch(error => console.error(error))
  }

  //---------------------------------
  // Public data
  return {
    initialise: initialise,
    generate: generate
  };

})();

// The End
