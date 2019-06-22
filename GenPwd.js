// GenPwd.js

//---------------------------------
// Namespace: GenPwd

var GenPwd = GenPwd || {};
GenPwd = (() => {

  // Application metadata
  const Info = {
    name: "GenPwd",
    author: "AndrewJ",
    version: "3.0.0",
    date: "2019-06-21",
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
  }

  const initialise_generators = () => {

    const generators = [
      { id: 0, name: "Generator 0" },
      { id: 1, name: "Generator 1" },
      { id: 2, name: "Generator 2" },
      { id: 3, name: "Markov", default: true }
    ]

    let fn
    $.each(generators, (i, gen) => {
      if (gen.default == true)
        fn = gen.id + '" selected="true'
      else
        fn = gen.id
      $('#generator').append($('<option value="' + fn + '">' + gen.name + '</option>'))
    })
  }

  const initialise_strengths = () => {
    const strengths = [ "Simple", "Medium", "Strong" ]
    $.each(strengths, (i, s) => {
      $('#strength').append($(`<option value="${s}">${s}</option>`))
    })
  }

  // Display the app info, and populate the list of available generators.
  const initialise = () => {
    Info.appendTo("header")
    initialise_generators()
    initialise_strengths()
  }

  // Call the Genpwd FaaS web service
  const randomWords = (genId, nwords, punctuation, capitals, numbers) => {
    const args = `genId=${genId}&nwords=${nwords}&punctuation=${punctuation}&capitals=${capitals}&numbers=${numbers}`
    const url = 'https://alphajuliet.lib.id/genpwd?' + args
    return fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    })
    .then(response => response.json()); // parses JSON response into native Javascript objects
  }

  // Main function to generate a list of random words, based on the chosen generator.
  const generate = (target, genId, strength, opts) => {
    const nwords = 10
    const punctuation = opts.punctuation ? 1 : 0
    const capitals = opts.capitals ? 1 : 0
    const numbers = opts.numbers ? 1 : 0
    
    randomWords(genId, nwords, punctuation, capitals, numbers)
      .then(data => {
        $(output).empty();
        R.forEach( (i) => {
          $(target)
            .append($("<div class='word'></div>")
              .append(data[i]))
        }, 
        R.range(0, nwords))
      })
      .catch(error => console.error(error))
  }

  // Public data
  return {
    initialise: initialise,
    generate: generate
  };

})();

// The End
