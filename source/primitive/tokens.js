
/*
Objects
  - Mapping
    - Operator (+, -, *, /)
      - Parenthesis ( (, ), [, ] )
    - Relation (sin, cos, tan)
  - Literal
    - Constant (pi, e)
    - Number (3.24, -5.39)
    - Parameter (x, t)
 */

class Mapping {

}

class Operator extends Mapping {

  constructor ( take,  ) {
  }

}

class Parenthesis extends Operator {

  constructor ( ) {
    super()
  }

}

class Relation extends Mapping {

}

class Literal {

}

class Constant extends Literal {

}

class Value extends  Literal {

}

class Parameter extends Literal {

}





let operators = {
  '(':  operator({ name: '(', latex: '\\left({', precedence: 0 }),
  ')': operator({ name: ')', latex: '}\\right)', precedence: 0 }),
  '+': operator({})
  '-':
  'neg': operator({})

}

let relations = {
  'sin': relation({ name: 'sin', latex: '\\sin'})
}



let tokens = [
  

]



let plusOrMinus = ['+', '-']

let transformations = [{
  test: test(Literal, '('),
  change: ( val, lb ) => [ val, operators['*'], lb ],
}, {
  test: test(')', Literal)
  change: ( rb, val ) => [ rb, operators['*'], val ],
}, {
  test: test(plusOrMinus, plusOrMinus),
  change: ( a, b ) => {
    let [ aPos, bPos ] = [ a.name == '+', b.name == '+' ]
    let isPositive = ( aPos && bPos ) || ( !aPos && !bPos )
    return [ operators [ isPositive ? '+' : '-' ] ]
  }
}, {
  test: test(operators['('], operators['-'], )


}, {
  test: test(Relation, Literal),
  change: (fn, v) => [fn, operators['('], v]
}]
