import React from 'react'


const nums = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']
const ops = ['/', '*', '-', '+', '=']
const numsIds = [
  'seven',
  'eight',
  'nine',
  'four',
  'five',
  'six',
  'one',
  'two',
  'three',
  'zero',
]
const opsIds = ['divide', 'multiply', 'subtract', 'add', 'equals']


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      expression: '',
      answer: 0,
    }

    this.clear = this.clear.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.compute = this.compute.bind(this)
  }

  clear = () => {
    this.setState({
      expression: '',
      answer: 0,
    })
  }
  // 途中
  // handleClick = (e) => {
  //   const { innerText } = e.target
  //   // console.log(innerText)
  //   const { expression, answer } = this.state

  //   switch (innerText) {
  //     case 'AC': {
  //       this.setState({
  //         expression: '',
  //         answer: 0,
  //       })
  //       break
  //     }

  //     case '=': {
  //       if (
  //         expression === '' ||
  //         expression === '-' ||
  //         expression === '/' ||
  //         expression === '+' ||
  //         expression === '*'
  //       ) {
  //         this.setState({
  //           expression: '=NAN',
  //           answer: 'NAN',
  //         })
  //         return
  //       }
  //       if (/[-*+/]/.test(expression.slice(-1))) {
  //         const exLast = expression.slice(0, -1)
  //         const res = eval(exLast)
  //         this.setState({
  //           expression: exLast + '=' + res,
  //           answer: res,
  //         })
  //         return
  //       }
  //       this.setState({
  //         expression: expression + '=' + eval(expression),
  //         answer: eval(expression),
  //       })
  //       break
  //     }
  //     case '.': {
  //       if (expression === '' || expression.includes('=')) {
  //         this.setState({
  //           expression: 0 + innerText,
  //           answer: 0 + innerText,
  //         })
  //         return
  //       }
  //       const numsArr = expression.split(/[-/*+]/)
  //       const last = numsArr.slice(-1)[0] // Why [0] が必要？
  //       console.log(numsArr, last, !last.includes('.'))
  //       if (!last.includes('.')) {
  //         if (ops.includes(expression.slice(-1))) {
  //           this.setState({
  //             expression: expression + 0 + innerText,
  //             answer: 0 + innerText,
  //           })
  //         } else {
  //           this.setState({
  //             expression: expression + innerText,
  //             answer: last + innerText,
  //           })
  //         }
  //       }

  //       break
  //     }
  //     default: {
  //       this.setState({
  //         expression: expression + innerText,
  //         answer: innerText,
  //       })
  //     }
  //   }

  // }

  handleClick = (e) => {
    const { expression, answer } = this.state
    const { innerText } = e.target

    const lastNums = expression.split(/[-+*/]/)
    const last = lastNums[lastNums.length - 1]
    console.log(lastNums, last)

    if (/=/.test(expression)) {
      if (/[0-9]/.test(innerText)) {
        this.setState({
          expression: innerText,
          answer: innerText,
        })
      } else if (innerText === '.') {
        this.setState({
          expression: '0.',
          answer: '0.',
        })
      } else {
        this.setState({
          expression: answer + innerText,
          answer: innerText,
        })
      }
    } else if (answer === 'NAN') {
      this.setState({
        expression: innerText,
        answer: innerText,
      })
    } else if (innerText === '.') {
      if (expression === '' || /[-*/+]/.test(expression.slice(-1))) {
        this.setState({
          expression: expression + '0.',
          answer: '0.',
        })
      } else if (expression.length >= 1) {
        // console.log(chunks, last)
        if (last.includes('.')) return
        if (expression.slice(-1) === '.') return
        this.setState({
          expression: expression + innerText,
          answer: last + innerText,
        })
      }
    } else if (innerText === '-') {
      if (
        /[*/+-]/.test(expression.slice(-2, -1)) &&
        expression.slice(-1) === '-'
      ) {
        return
      } else if (
        expression === '+' ||
        expression === '/' ||
        expression === '*'
      ) {
        this.setState({
          expression: '-',
          answer: innerText,
        })
      } else {
        this.setState({
          expression: expression + innerText,
          answer: innerText,
        })
      }
    } else if (/[*/+]/.test(innerText)) {
      if (
        expression.slice(-1) === '-' &&
        /[*-/+]/.test(expression.slice(-2, -1))
      ) {
        this.setState({
          expression: expression.slice(0, -2) + innerText,
          answer: innerText,
        })
      } else if (/[*/+-]/.test(expression.slice(-1))) {
        this.setState({
          expression: expression.slice(0, -1) + innerText,
          answer: innerText,
        })
      } else {
        this.setState({
          expression: expression + innerText,
          answer: innerText,
        })
      }
    } else if (innerText === '0') {
      // console.log(last)
      if (last === '0' && !lastNums.includes['.']) return
      this.setState({
        expression: expression + innerText,
        answer: last + innerText,
      })
    } else {
      this.setState({
        expression: expression + innerText,
        answer: last + innerText,
      })
    }
  }

  compute = () => {
    const { expression, answer } = this.state
    if (
      expression === '' ||
      expression === '-' ||
      expression === '/' ||
      expression === '+' ||
      expression === '*'
    ) {
      this.setState({
        expression: 'NAN',
        answer: 'NAN',
      })
    } else {
      if (/[-*+/]/.test(expression.slice(-1))) {
        const exLast = expression.slice(0, -1)
        const res = eval(exLast)
        this.setState({
          expression: exLast + '=' + res,
          answer: res,
        })
      }
      const result = eval(expression)
      this.setState({
        expression: expression + '=' + result,
        answer: result,
      })
    }
  }

  render() {
    
    
    const { expression, answer } = this.state
    const numElements = nums.map((num, index) => {
      return (
        <div
          className='button gray'
          id={numsIds[index]}
          key={index}
          onClick={this.handleClick}
        >
          {num}
        </div>
      )
    })
    const opsElements = ops.map((op, index) => {
      return (
        <div
          className='button l-gray'
          id={opsIds[index]}
          key={index}
          onClick={op === '=' ? this.compute : this.handleClick}
        >
          {op}
        </div>
      )
    })

    return (
      <div className='container'>
        <div className='calculator'>
          <div className='top'>
            <div className='doing'>{expression}</div>
            <div id='display'>{answer}</div>
          </div>
          <div className='button' id='clear' onClick={this.clear}>
            AC
          </div>
          {opsElements}
          {numElements}
          <div className='button gray' id='decimal' onClick={this.handleClick}>
            .
          </div>
        </div>
      </div>
    )
  }
}

export default App