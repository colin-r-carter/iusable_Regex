# Simple JavaScript file to higlight Articles, Paragraphs and Federal court decisions in German, French an Italian

This simple script uses two regular expressions to extract information of the text and highlights them in either blue (law) or red (federal court decisions).
I tried to make it work with German, French and Italian texts.

Federal court decisions should be linked to automatically.
Law articles use the link service from weblaw, as I have not worked on converting the articles into the fedlex.admin.ch link-schemata. PRs are welcome.
And a huge thank you to weblaw.ch for making links.weblaw.ch openly available! In some situations there are even refined versions of the laws by weblaw.

_Warning_ This tool does not work on every text. There are a few false tags and in some situations it won't highlight at all:

## RegexArt

Matches:
0: Matched String (Art. 1 Abs. 1 Ziff. 1 lit. a TEST)
1: Artikel/Article/Articolo/Par (text) (Art)
2: Artikel/Article/Articolo/Par (number) (1)
3: Abs/Al/Cpv (text) (Abs)
4: Abs/Al/Cpv (number) (1)
5: Ziff./Ch./N. (text) (Ziff)
6: Ziff./Ch./N. (number) (1)
7: lit./let./lett. (text) (lit)
8: lit./let./lett. (number) (a)
9: Law (text) (TEST)

## RegexBGE

Matches:
0: Matched String (eg. "BGE 141 III 395")
1: BGE/ATV/DTF (eg. "BGE")
2: (number) (eg. "141")
3: Field (number) (eg. "III")
4: Pagenumber (number) (eg. 395)

## Limits

- Does not work with enumerations of articles of law
- The law-regex returns any String with a first capital letter as a Law. It does not check, wether the law exists or not.

## To Do

- I would like to package this script into a simple Browser-Extension, so laws and federal court decisions would be highlighted and linked to on every pageload.
- Instead of linking to the ressources a tooltip could be displayed. Simple version would be by embedding an iframe, more complex solution would be to access an API (to my knowledge there's no open API for laws and federal court decisions, if there is, please let me know 😃)
- Refine and improve the regular expressions.
- In a next step it could be nice to check the possibility of a NER-model (with TensorFlowJs for example) to circumvent the above mentioned limitations.
