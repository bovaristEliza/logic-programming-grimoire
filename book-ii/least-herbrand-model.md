---
layout: chapter
title: Of the least Herbrand model
plain: Declarative semantics of definite programs
lloyd: "§5–§6"
book: Book II, Of Definite Programs
sigil: /assets/sigils/fixpoint.svg
permalink: /book-ii/least-herbrand-model/
---

A definite program holds true in many worlds. Among them one is smallest, and it contains exactly the facts the program commits you to. This chapter names that world, shows that it is unique, and gives the ritual that builds it, stage by stage, from nothing.
{: .opening}

## The reagents

<aside class="gloss" markdown="1">
In Prolog the arrow is written `:-`, the commas in the body are conjunctions, and a fact drops the arrow altogether.
</aside>

<div class="incantation" markdown="1">
*Of the definite clause*
{: .name}

A *definite program clause* is a clause of the form

$$
A \leftarrow B_1, \dots, B_n \qquad (n \ge 0)
$$

where $$A$$ and every $$B_i$$ are atoms. $$A$$ is the *head*, $$B_1, \dots, B_n$$ the *body*. When $$n = 0$$ the clause is a *unit clause*, or fact. A *definite program* is a finite set of definite program clauses.
</div>

Read declaratively, the clause says: for every assignment of its variables, if all of $$B_1, \dots, B_n$$ hold then $$A$$ holds. Nothing in a definite program can say that something is false. This absence is what makes the rest of the chapter work.

## The book of true names

To ask which worlds satisfy a program, we first fix the vocabulary those worlds may speak about. The natural choice is to let the program's own symbols name everything.

<aside class="gloss" markdown="1">
If $$P$$ has no constant, one is added so that the universe is not empty. Otherwise nothing could be named at all.
</aside>

<div class="incantation" markdown="1">
*Of the Herbrand universe and base*
{: .name}

The *Herbrand universe* $$U_P$$ of a program $$P$$ is the set of all ground terms built from the constants and function symbols occurring in $$P$$.

The *Herbrand base* $$B_P$$ is the set of all ground atoms whose predicate symbols occur in $$P$$ and whose arguments are drawn from $$U_P$$.
</div>

<div class="incantation" markdown="1">
*Of Herbrand interpretations*
{: .name}

A *Herbrand interpretation* of $$P$$ has $$U_P$$ as its domain and interprets every constant and function symbol as itself. Since the terms are fixed, such an interpretation is determined entirely by which ground atoms it makes true, so we identify it with a subset $$I \subseteq B_P$$. A *Herbrand model* of $$P$$ is a Herbrand interpretation that is a model of $$P$$.
</div>

<aside class="gloss" markdown="1">
The law depends on clauses being universally quantified. For arbitrary first-order formulas, existentials can demand witnesses the program has no name for, and the law fails.
</aside>

<div class="law" markdown="1">
*First law: names suffice*
{: .name}

A set of clauses has a model if and only if it has a Herbrand model.
</div>

So for definite programs nothing is lost by restricting attention to subsets of $$B_P$$. And at least one such subset is always a model: $$B_P$$ itself, where every atom is true and so every clause head is satisfied. A definite program cannot be inconsistent.

## The intersection of worlds

<div class="law" markdown="1">
*Second law: the intersection of models*
{: .name}

If $$\{M_i\}_{i \in J}$$ is a non-empty set of Herbrand models of a definite program $$P$$, then $$\bigcap_{i \in J} M_i$$ is a Herbrand model of $$P$$.
</div>

<details class="working" markdown="1">
<summary>The working</summary>

Take any ground instance $$A \leftarrow B_1, \dots, B_n$$ of a clause in $$P$$, and suppose every $$B_k$$ lies in $$\bigcap_i M_i$$. Then every $$B_k$$ lies in each $$M_i$$. Each $$M_i$$ is a model, so $$A \in M_i$$ for every $$i$$, and hence $$A \in \bigcap_i M_i$$. Every ground instance of every clause is therefore satisfied by the intersection.
</details>

<aside class="gloss" markdown="1">
The law breaks as soon as clauses may have disjunctive heads, or negation in the body. The program $$p \leftarrow \neg q$$ has two minimal models, $$\{p\}$$ and $$\{q\}$$, and their intersection, the empty set, is not a model.
</aside>

Taking the intersection of *all* Herbrand models, which is a non-empty set since $$B_P$$ belongs to it, gives the smallest one.

<div class="incantation" markdown="1">
*Of the least Herbrand model*
{: .name}

The *least Herbrand model* of a definite program $$P$$ is

$$
M_P = \bigcap \{\, I \subseteq B_P \mid I \text{ is a Herbrand model of } P \,\}.
$$

</div>

Smallest is not an aesthetic choice. It coincides exactly with what the program entails.

<div class="law" markdown="1">
*Third law: van Emden and Kowalski*
{: .name}

For a definite program $$P$$,

$$
M_P = \{\, A \in B_P \mid P \models A \,\}.
$$

</div>

<details class="working" markdown="1">
<summary>The working</summary>

For a ground atom $$A$$: $$P \models A$$ holds iff $$P \cup \{\neg A\}$$ is unsatisfiable. The set $$P \cup \{\neg A\}$$ is a set of clauses, so by the first law it is unsatisfiable iff it has no Herbrand model. That means every Herbrand model of $$P$$ makes $$A$$ true, which is to say $$A \in M_P$$.
</details>

### A first casting

<aside class="gloss" markdown="1">
Here $$U_P = \{a, b, c\}$$ and $$B_P$$ holds $$2 \times 3^2 = 18$$ ground atoms.
</aside>

```prolog
edge(a, b).
edge(b, c).
path(X, Y) :- edge(X, Y).
path(X, Z) :- edge(X, Y), path(Y, Z).
```

The least Herbrand model is

$$
M_P = \{\text{edge}(a,b),\ \text{edge}(b,c),\ \text{path}(a,b),\ \text{path}(b,c),\ \text{path}(a,c)\}.
$$

$$B_P$$ is also a model, and so are sets in between, but not every set in between. Add only $$\text{path}(c,a)$$ to $$M_P$$ and the instance $$\text{path}(b,a) \leftarrow \text{edge}(b,c), \text{path}(c,a)$$ has a true body and a false head. Closing the set under the clauses forces $$\text{path}(b,a)$$, then $$\text{path}(a,a)$$, and the resulting set of eight atoms is a model. It is a world where the program holds and also believes things the program never said.

## The circle redrawn

The intersection describes $$M_P$$ but gives no way to compute it. For that we turn the program into an operator on interpretations.

<div class="incantation" markdown="1">
*Of the immediate consequence operator*
{: .name}

For a definite program $$P$$, the map $$T_P : 2^{B_P} \to 2^{B_P}$$ is

$$
T_P(I) = \{\, A \in B_P \mid A \leftarrow B_1, \dots, B_n \text{ is a ground instance of a clause in } P \text{ and } \{B_1, \dots, B_n\} \subseteq I \,\}.
$$

</div>

<aside class="gloss" markdown="1">
Facts have empty bodies, so they belong to $$T_P(I)$$ for every $$I$$, including $$\emptyset$$.
</aside>

$$T_P(I)$$ is everything that follows from $$I$$ by one application of one clause. Two properties carry the whole construction. The subsets of $$B_P$$, ordered by inclusion, form a complete lattice; and $$T_P$$ is *continuous* on it, meaning it preserves the union of every chain $$I_0 \subseteq I_1 \subseteq \cdots$$. Continuity implies monotonicity: $$I \subseteq J$$ gives $$T_P(I) \subseteq T_P(J)$$.

<div class="law" markdown="1">
*Fourth law: models are closed sets*
{: .name}

A Herbrand interpretation $$I$$ is a model of $$P$$ if and only if $$T_P(I) \subseteq I$$.
</div>

<details class="working" markdown="1">
<summary>The working</summary>

$$I$$ is a model iff, for every ground instance $$A \leftarrow B_1, \dots, B_n$$, whenever the body is contained in $$I$$ the head is in $$I$$. The heads with bodies contained in $$I$$ are exactly the elements of $$T_P(I)$$.
</details>

<aside class="gloss" markdown="1">
Knaster and Tarski: a monotone map on a complete lattice has a least fixpoint, equal to the meet of all $$I$$ with $$T(I) \subseteq I.$$
</aside>

The models of $$P$$ are thus precisely the pre-fixpoints of $$T_P$$. By the Knaster–Tarski theorem the least fixpoint of $$T_P$$ is the intersection of its pre-fixpoints, that is, the intersection of all Herbrand models. So $$\operatorname{lfp}(T_P) = M_P$$. What remains is to reach it.

<div class="incantation" markdown="1">
*Of the upward powers*
{: .name}

The *ordinal powers* of $$T_P$$, up to $$\omega$$, are

$$
T_P \uparrow 0 = \emptyset, \qquad
T_P \uparrow (n+1) = T_P\big(T_P \uparrow n\big), \qquad
T_P \uparrow \omega = \bigcup_{n < \omega} T_P \uparrow n.
$$

</div>

<div class="law" markdown="1">
*Fifth law: the circle closes at* $$\omega$$
{: .name}

For a definite program $$P$$,

$$
M_P = \operatorname{lfp}(T_P) = T_P \uparrow \omega.
$$

</div>

<details class="working" markdown="1">
<summary>The working</summary>

By monotonicity and induction, $$T_P \uparrow n \subseteq T_P \uparrow (n+1)$$, so the stages form a chain. By continuity,

$$
T_P(T_P \uparrow \omega) = \bigcup_{n} T_P(T_P \uparrow n) = \bigcup_{n} T_P \uparrow (n+1) = T_P \uparrow \omega,
$$

so $$T_P \uparrow \omega$$ is a fixpoint. If $$F$$ is any fixpoint, then $$\emptyset \subseteq F$$, and $$T_P \uparrow n \subseteq F$$ gives $$T_P \uparrow (n+1) \subseteq T_P(F) = F$$. Hence every stage, and their union, lies inside $$F$$.
</details>

<aside class="gloss" markdown="1">
Why $$\omega$$ and never later: every clause body is finite, so an atom that enters needs only finitely many premises, each of which entered at some finite stage.
</aside>

### The first casting, by stages

<div class="table-scroll" markdown="1">

| Stage | Atoms added |
|---|---|
| $$T_P \uparrow 1$$ | $$\text{edge}(a,b),\ \text{edge}(b,c)$$ |
| $$T_P \uparrow 2$$ | $$\text{path}(a,b),\ \text{path}(b,c)$$ |
| $$T_P \uparrow 3$$ | $$\text{path}(a,c)$$ |
| $$T_P \uparrow 4$$ | nothing: the circle has closed |

</div>

Here the fixpoint is reached at a finite stage, as it always is when $$B_P$$ is finite.

### A casting that never closes early

```prolog
nat(0).
nat(s(X)) :- nat(X).
```

<aside class="gloss" markdown="1">
Here $$M_P = B_P$$: the smallest model is also the largest. This is unusual, and happens because every atom in the base is entailed.
</aside>

The Herbrand universe is infinite, $$U_P = \{0, s(0), s(s(0)), \dots\}$$, and

$$
T_P \uparrow n = \{\, \text{nat}(s^k(0)) \mid k < n \,\}.
$$

No finite stage is a fixpoint, since each one admits the next numeral. Only the union, $$T_P \uparrow \omega$$, contains them all.

<aside class="gloss" markdown="1">
The descent from $$B_P$$ is less well behaved: $$T_P \downarrow \omega$$ need not be a fixpoint, and the greatest fixpoint may lie beyond $$\omega$$. It belongs to the chapters on failure.
</aside>

## What the chapter has bound

Three descriptions of the meaning of a definite program coincide:

$$
\bigcap \{\, I \mid I \models P \,\}
\;=\; \{\, A \in B_P \mid P \models A \,\}
\;=\; \operatorname{lfp}(T_P)
\;=\; T_P \uparrow \omega.
$$

The first is model-theoretic, the second logical, the third and fourth fixpoint-theoretic. None of them says how a single query is answered. The next chapters approach the same set from the operational side and show that SLD-resolution, the ritual of contradiction, proves exactly the atoms of $$M_P$$ and no others.
