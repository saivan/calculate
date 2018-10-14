
import { tokenize } from '../source/main.js'

let stringify = t => t.reduce((a, b) => (a.name || a) + (b.name || b), '')

describe ('The tokenizer function', () => {

  it ('can tell the difference between negation and subtraction', false, () => {

  })

  it ('can deal with multiple plusses and minuses', false, () => {

  })

  it ('Adds brackets where there is ambiguity', () => {

    //
    let t1 = tokenize('sinx/cosx')
    expect(stringify(t1)).deep.equal('sin(x)/cos(x)')
    expect(t1.length).to.equal(9)


  })

  it ('Adds a multiplication symbol before and after functions', () => {

    //
    // let t1 = tokenize('(2t+1)sin((2t+1)x)')
    // expect(stringify(t1)).deep.equal('(2*t+1)*sin((2*t+1)*x)')

    //
    let t2 = tokenize('5x((4x+3)/4)')
    expect(stringify(t2)).deep.equal('5*x*((4*x+3)/4)')

    //
    // let t3 = tokenize('x(x-1)x')
    // expect(stringify(t3)).deep.equal('x*(x-1)*x')

    let t4 = tokenize('4cos(x-3pi/2)')
    expect(stringify(t4)).deep.equal('4*cos(x-3*pi/2)')
    expect(t4.length).to.equal(12)


  })

  it ('Adds a multiplication symbol before and after brackets', () => {

    let t1 = tokenize('x(x+1)')
    expect(stringify(t1)).deep.equal('x*(x+1)')

    // let t2 = tokenize('(x+1)x')
    // expect(stringify(t2)).deep.equal('(x+1)*x')

    // let t3 = tokenize('(x+1)(x)')
    // expect(stringify(t3)).deep.equal('(x+1)*(x)')
  })


  it ('Adds a multiplication symbol before and after variables', () => {


  })

  it ('Adds brackets at the first available term boundary', false, () => {
    // let t2 = tokenize('logsinlog(x-3)')
    // expect(stringify(t2)).deep.equal('log(sin(log(x-3)))')

  })

  it ('Replaces concurrent negations and subtractions', false, () => {
    '(5x+-3)/3'
    '(5-- -3) --4+6'
    '-3(---x+4)'
  })

  it ('tokenizes negation', false, () => {
    '-3*-(4)'
    '-3(-x+4)'
    '-cos(x)'
  })

  it ('tokenizes negative numbers properly', false, () => {
    '-3/-2'

  })

  it ('can handle complex expressions ', false, () => {

    let t1 = tokenize('sinxcosx')
    expect(stringify(t1)).deep.equal('sin(x)*cos(x)')

    let t2 = tokenize('sin(x^2-3)cosx')
    expect(stringify(t2)).deep.equal('sin(x^2-3)*cos(x)')

    // TODO: ADD MORE

  })

})
