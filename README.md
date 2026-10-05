# Grimoire

Logic programming in the order of Lloyd's *Foundations of Logic Programming*, written as a book of the art.

## Publish

1. Create a public repository named `grimoire` and push these files to `main`.
2. Settings > Pages > Build and deployment: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<user>.github.io/grimoire/`.

If the repository has another name, change `baseurl` in `_config.yml` to match.

## Preview locally

    jekyll serve      # then open http://localhost:4000/grimoire/

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
