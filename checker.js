//Regex for Articles&Paragraphs in DE, FR and IT
const regexArt = /(§+|Art|art|Artikel|article|Article|articolo|Articolo|Paragraph|Par|par)\.?\s*(\d+(?:\w\b)?)\s*(?:(Abs|Absatz|Al|al|Cpv|cpv)\.?\s*(\d+(?:\w\b)?))?\s*(?:(Ziff|Ziffer|Ch|ch|N|n)\.?\s*(\d+(?:\w\b)?))?\s*(?:(Lit|lit|Buchstabe|Bchst|Let|let|Lett|lett)\.?\s*([A-Za-z]?))?.{0,10}?(\b[A-Z][A-Za-z]*[A-Za-z])/g

//Regex for BGE/ATF/DTF (DE/FR/IT)
const regexBGE = /(?:(?:(BGE|ATF|DTF)\.?\s*)?(\d+(?:\w\b))\s*M{0,4}(IX|IV|V?I{0,3})\s*(\d+(?:\w\b)))/gi

function highlight(text) {
    //Highlight Law-Art. with <a>...</a>
    text = text.replace(regexArt, function(ref) {
          let res = [...ref.matchAll(regexArt)];
          if(res[0][1] !== "Art"){
            return '<a class="art" href="https://links.weblaw.ch/' + res[0][9] + "+" + "Art." + res[0][2]  +'">' + ref + '</a>'; //Todo convert link to admin.ch link
          } else {
            return '<a class="art" href="https://links.weblaw.ch/' + res[0][9] + "+" + res[0][1] +"." + res[0][2]  +'">' + ref + '</a>'; //Todo convert link to admin.ch link
          }
        });
    //Highlight BGEs with <a>...</a>
    return text.replace(regexBGE, function(ref) {
      let res = [...ref.matchAll(regexBGE)];
      let lang;

     if(!res[0][1]){
      res[0][1] = "BGE";
     }
     if(res[0][1] == "BGE"){
      lang = "de";
     }
     if(res[0][1] == "ATF"){
      lang = "fr";
     } 
     if(res[0][1] == "DTF"){
      lang = "it";
     }
     let link = "https://www.bger.ch/ext/eurospider/live/"+lang+"/php/aza/http/index.php?lang="+lang+"&type=show_document&page=1&from_date=&to_date=&sort=relevance&insertion_date=&top_subcollection_aza=all&query_words=&rank=0&azaclir=aza&highlight_docid=atf%3A%2F%2F"+res[0][2]+"-"+res[0][3]+"-"+res[0][4]+"%3A"+lang+"&number_of_ranks=0#page"+res[0][4];
      return '<a class="bge" href="' + link + '">' + ref + '</a>';
})
  }

  function warnArt(){
    if(!confirm("You have clicked on a highlighted Paragraph or Article which didn't match with 'Art.'. The link might therefore be broken (e.g. case of cantonal/communal laws). Continue anyway?")){
      return false;
    }
  }
  
  var text = document.querySelector('.regius').innerHTML;
  var newhtml = highlight(text);
  document.querySelector('.regius').innerHTML = newhtml;