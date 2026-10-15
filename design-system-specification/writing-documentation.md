# Writing Documentation

Give each document type one question to answer and one main reader. When you're unsure where a sentence belongs, ask which question it answers.

The two readers in your example then never need the same page. The Card docs tell the consumer which class to use, and the typography foundation page explains the hierarchy to the designer. Each page links to the other instead of repeating it.

### One question per layer

| Layer           | Question it answers                                | Primary reader                                                  | Changes when…                                          |
| --------------- | -------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| RFC             | Should we change X?                                | Maintainers, proposers                                          | Never after it closes; it's a record of the discussion |
| ADR             | Why is it this way, and what else did we consider? | Future maintainers                                              | Never; a later ADR supersedes it                       |
| RULES           | What must be true?                                 | Maintainers, agents, check_spec.py                              | An ADR is accepted                                     |
| Spec            | What is the system, and how does it work?          | Designers, system builders, people adapting it to another stack | The model changes                                      |
| Docs (apps/web) | How do I use it?                                   | Consumers and product designers                                 | The implementation or API changes                      |
| Storybook       | What are this component's props and states?        | Developers                                                      | The component changes                                  |

Information should only flow one way: ADR → RULES → spec → docs. Docs can simplify the spec, but they never add facts the spec doesn't have. The spec states each decision but leaves the reasoning in the ADR and links to it.

### Tests for an individual sentence

- **Would it change if we renamed a class or changed a component API?** Then it belongs in the docs, not the spec.
- **Would it change only if we reversed a decision?** Then it's spec material.
- **Is it reasoning or a rejected alternative?** Put it in the ADR and give the spec a one-line link.
- **Is it about how we work, such as Figma, Style Dictionary or scripts?** Put it in the README or governance.

### Ways to hold the line

- **Start each spec and docs page with a "Who this is for / what it answers" line.** It's a quick self-check while you write.
- **On docs pages, put "Use" first and "How it works" second**, with the second section linking to the spec rather than restating it. Consumers can stop reading once they have the class they need.

The docs site is a natural fit for how-to guides for consumers, explanation pages for designers and reference pages generated from the spec.
