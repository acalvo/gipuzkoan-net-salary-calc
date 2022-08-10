# gipuzkoan-net-salary-calc

Monthly net salary calculator that uses the applicable tax rates of Gipuzkoa. Deployed on <https://www.albertocalvo.com/sueldo/>.

## History

A first version of this simple calculator was done ages ago, back when I started working at a company and had my first salary and subsequent raises, due to my inability to mentally translate between gross annual salary (the amount companies speak about) and net monthly salary (the amount you actually receive in your bank account after taxes).
I had looked for similar calculators on the Internet, but all the tools I found used the Spanish tax rates, which are quite similar to the ones in Gipuzkoa, but not exactly the same.

I made it in a rush for myself and uploaded it to a hidden path of my domain.
In the following months, in different conversations with colleagues and friends, I mentioned the calculator and people happened to like it and a lot of them keep using it as of today.
For that reason I felt the need to give a refresh to the original implementation; I dropped old AngularJS and Bootstrap libs, improved the mobile UI, made a dark theme, etc.

It was still such a tiny tool that I hadn't even bothered to set up a repo with its CI, automatic deployment, etc. Until Summer 2022 when I finally polished everything up, and set up those missing bits.

## Getting started

Setting up the environment should be pretty straightforward: having a current version of Node.js and npm installed, clone the repo and run `npm i` to install dependencies. From that point you can:

* `npm start` to compile it in dev mode, serve it in <http://localhost:8080>, and rebuild automatically on code changes.
* `npm test` to run the tests.
* `npm run build` to compile for production. The output is generated in `./dist`.
* `npm run lint` to run some sanity checks to ensure code quality.

This project uses web components built with [Lit](https://lit.dev/), and [esbuild](https://esbuild.github.io/) to wrap everything up and generate the bundles.

PRs are welcome, of course!
