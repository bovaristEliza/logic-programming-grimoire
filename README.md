# Grimoire

Logic programming in the order of Lloyd's *Foundations of Logic Programming*, written as a book of the art.

## Publish

1. Push these files to the `main` branch of `logic-programming-grimoire`.
2. Settings > Pages > Build and deployment: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://bovaristEliza.github.io/logic-programming-grimoire/`.

If the repository has another name, change `baseurl` in `_config.yml` to match.

## Preview locally

    jekyll serve --livereload --config _config.yml,_config.dev.yml

Then open `http://localhost:4000/`.

## Sources and rights

The project is an independent educational treatment of logic programming. Its
principal reference is J. W. Lloyd, *Foundations of Logic Programming*, 2nd
ed., Springer, 1987, DOI
[10.1007/978-3-642-83189-8](https://doi.org/10.1007/978-3-642-83189-8).

See [COPYRIGHT.md](COPYRIGHT.md) for the original material and
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for external software and
fonts. Unless a passage is clearly marked and cited as a quotation, the prose
is independently written for this project. The project is not affiliated with
J. W. Lloyd or Springer.

## Writing a chapter

- Add a Markdown file under the book's folder with `layout: chapter` and a `permalink`.
- Give it a `url` in `_data/tome.yml`; chapters without one are listed as sealed.
- Optional front matter: `plain`, `lloyd`, `book`, `sigil`, `prev`/`next` (each with `title` and `url`).

Blocks:

    <div class="incantation" markdown="1">   definitions
    <div class="law" markdown="1">           theorems
    <details class="working" markdown="1">   proofs (add <summary>The working</summary>)
    <aside class="gloss" markdown="1">       margin notes; place before the paragraph they annotate

Inside each block, a first paragraph followed by `{: .name}` is its title.
Math is kramdown style: `$$...$$` inline, and `$$` on its own lines for display.
Leave a blank line between a closing `$$` and `</div>`, or the display is parsed as inline.
Write `\mid` instead of `|` inside math, and avoid `{{` (Liquid).
