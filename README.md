# Simple JavaScript file to higlight federal Articles, Paragraphs and Federal court decisions in German, French an Italian (🇨🇭)

_Warning:_ This script and the regular expressions are in active development and not finished yet.

This simple script uses two regular expressions to extract information of the text and highlights them in either blue (law) or red (federal court decisions).
I tried to make it work with German, French and Italian texts.

Federal court decisions should be linked to automatically.
Law articles use the link service from weblaw, as I have not worked on converting the articles into the fedlex.admin.ch link-schemata. PRs are welcome.
And a huge thank you to weblaw.ch for making links.weblaw.ch openly available! In some situations there are even refined versions of the laws by weblaw.

_Warning_ This tool does not work on every text. There are a few false tags and in some situations it won't highlight at all.

## RegexArt

| Array entry | Matches                                            |
| ----------- | -------------------------------------------------- |
| 0:          | Matched String (Art. 1 Abs. 1 Ziff. 1 lit. a TEST) |
| 1:          | Artikel/Article/Articolo/Par (text) (Art)          |
| 2:          | Artikel/Article/Articolo/Par (number) (1)          |
| 3:          | Abs/Al/Cpv (text) (Abs)                            |
| 4:          | Abs/Al/Cpv (number) (1)                            |
| 5:          | Ziff./Ch./N. (text) (Ziff)                         |
| 6:          | Ziff./Ch./N. (number) (1)                          |
| 7:          | lit./let./lett. (text) (lit)                       |
| 8:          | lit./let./lett. (number) (a)                       |
| 9:          | Law (text) (TEST)                                  |

## RegexBGE

| Array entry | Matches                                |
| ----------- | -------------------------------------- |
| 0:          | Matched String (eg. "BGE 141 III 395") |
| 1:          | BGE/ATV/DTF (eg. "BGE")                |
| 2:          | (number) (eg. "141")                   |
| 3:          | Field (number) (eg. "III")             |
| 4:          | Pagenumber (number) (eg. 395)          |

## RegexBGer

| Array entry | Matches                              |
| ----------- | ------------------------------------ |
| 0:          | Matched String (eg. "5A_1000/2020")  |
| 1:          | Number of department (eg. "1")       |
| 2:          | Letter for the procedures (eg. "A")  |
| 3:          | Consecutive numbering (eg. "1/2022") |

## How to use

The script highlighty every match in `.regius` .

1. download `checker.js`
2. add 'checker.js' to your html-file with `<script src="path/to/checker.js">`
3. add the class `regius` to the element you would like to highlight.
4. reload the page.

Check index.html for an example.

## Limits

- Does not work with enumerations of articles of law
- The law-regex returns any String with a first capital letter as a Law. It does not check, wether the law exists or not.

## 🚧 Work in Progress (coming soon):
- I am currently extending the regex with all official abrevs. Will be available soon.
- Will switch from the HTML-Demo to a more (i)usable format (library).

## To Do

- I would like to package this script into a simple Browser-Extension, so laws and federal court decisions would be highlighted and linked to on every pageload.
- Instead of linking to the ressources a tooltip could be displayed. Simple version would be by embedding an iframe, more complex solution would be to access an API (to my knowledge there's no open API for laws and federal court decisions, if there is, please let me know 😃). Maybe SPARQL can be used, or at least used to get scrapable documents to generate a (local) API for single norms...
- Refine and improve the regular expressions.
