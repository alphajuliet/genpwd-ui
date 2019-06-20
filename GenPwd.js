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
    date: "2019-06-20",
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

  // Display the app info, and populate the list of available generators.
  var initialise = () => {
    Info.appendTo("header");
  };

  // Call the Genpwd FaaS web service
  var randomWords = (nwords, punctuation, capitals, numbers) => {
    const args = `nwords=${nwords}&punctuation=${punctuation}&capitals=${capitals}&numbers=${numbers}`
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
  var generate = (output, gen_opt, opts) => {
    const nwords = 10
    const punctuation = opts.punctuation ? 1 : 0
    const capitals = opts.capitals ? 1 : 0
    const numbers = opts.numbers ? 1 : 0
    randomWords(nwords, punctuation, capitals, numbers)
      .then(data => {
        $(output).empty();
        R.forEach( (i) => {
          $(output)
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
