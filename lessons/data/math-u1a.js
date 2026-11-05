/* Math · Mini-Unit: Order of Operations — 3 lessons (NC.5.OA.2), Sep 18–22.
   Not taught in IM; follows the BCS curriculum map (Making Sense of Order of Operations, expressions vocabulary, workshop).
   NC 5th grade: parentheses only (no brackets, no exponents). */
(function () {
  var OA2 = ['NC.5.OA.2', 'Write, explain, and evaluate numerical expressions involving the four operations to solve up to two-step problems. Include expressions with parentheses, using order of operations.'];
  LessonKit.unit({
    id: 'math-u1a', subject: 'math', short: 'Mini-Unit', title: 'Order of Operations', home: '../index.html', unitHref: '../unit1a.html',
    lessons: [
      {
        n: 1, title: 'Making Sense of Order of Operations', when: 'Sep 18',
        goal: 'Let’s figure out why everyone needs to follow the same order when solving an expression.',
        stds: [OA2],
        targets: ['I can explain why we need an order of operations.', 'I can evaluate expressions with parentheses, ×, ÷, + and −.'],
        vocab: [['expression', 'Numbers and operation signs that show a value, like 4 + 3 × 2.'], ['evaluate', 'Find the value of an expression.'], ['parentheses', 'The symbols ( ) that group what to do first.'], ['order of operations', 'The rules for which step to do first.']],
        outline: [
          ['Warm-up', 10, '<b>Expressions Number Talk:</b> 4 + 3 × 2. Two students got different answers. Who is right?'],
          ['Activity 1', 15, '<b>Let’s make sense of the order.</b> Why do we multiply before we add? (Think: 4 + three groups of 2.)'],
          ['Activity 2', 15, '<b>Let’s move parentheses.</b> Same numbers, different parentheses, different values.'],
          ['Synthesis', 5, 'What do parentheses tell us? Why does everyone need the same rules?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Making Sense of Order of Operations slides (digital version available)', 'Moving Parentheses (OA.2) task', 'Tile and Parentheses Puzzles (OA.2)', 'Math notebook'],
        notes: [
          { t: 'p', html: '<p>Two students solved <b>4 + 3 × 2</b>. One got 14. One got 10. Who is right? Mathematicians agreed on an <b>order of operations</b> so everyone gets the same answer.</p>' },
          { t: 'key', label: 'Order of operations', html: '<ol style="margin:0"><li><b>Parentheses</b> first: ( )</li><li><b>Multiply and divide</b>, from left to right</li><li><b>Add and subtract</b>, from left to right</li></ol>' },
          { t: 'example', title: 'Why multiply first?', q: '4 + 3 × 2', steps: ['3 × 2 means <b>3 groups of 2</b>. That is one amount: 6.', 'So 4 + 3 × 2 means 4 + 6.', '4 + 6 = <b>10</b>. (14 is what you get if you add first — that changes the meaning.)'] },
          { t: 'example', title: 'Parentheses change the meaning', q: '(4 + 3) × 2', steps: ['Parentheses first: 4 + 3 = 7.', 'Then 7 × 2 = <b>14</b>.', 'Same numbers, different parentheses, different value!'] },
          { t: 'fill', html: 'First do the work inside the [[parentheses|parenthesis]]. Next, [[multiply|multiplication]] and divide from left to right. Last, add and [[subtract|subtraction]] from left to right.' },
          { t: 'tip', html: '<b>Watch out:</b> “Multiply and divide” are a team. Do whichever comes first from left to right. 12 ÷ 3 × 2 = 4 × 2 = 8.' },
          { t: 'try', q: { q: 'Evaluate: 20 − 4 × 3', answer: 8, hint: 'Multiply first: 4 × 3.', why: '4 × 3 = 12. 20 − 12 = 8.' } }
        ],
        practice: [
          { q: 'Evaluate: 5 + 6 × 2', answer: 17, hint: 'Multiply before you add.', why: '6 × 2 = 12. 5 + 12 = 17.' },
          { q: 'Evaluate: (5 + 6) × 2', answer: 22, hint: 'Parentheses first.', why: '5 + 6 = 11. 11 × 2 = 22.' },
          { q: 'Evaluate: 18 ÷ 3 + 4 × 2', answer: 14, hint: 'Do 18 ÷ 3 and 4 × 2 first, then add.', why: '6 + 8 = 14.' },
          { q: 'Evaluate: 30 − (12 − 5)', answer: 23, why: '12 − 5 = 7. 30 − 7 = 23.' },
          { q: 'Evaluate: 24 ÷ 4 × 2', answer: 12, hint: '× and ÷ are a team. Go left to right.', why: '24 ÷ 4 = 6. 6 × 2 = 12.' },
          { q: 'Jada says 10 − 2 × 3 = 24. What mistake did she make?', choices: ['She subtracted before multiplying.', 'She multiplied wrong.', 'There is no mistake.'], answer: 0, why: 'Multiply first: 2 × 3 = 6, so 10 − 6 = 4.' }
        ],
        lab: { type: 'parens', title: 'Parentheses Puzzles', lead: 'Where do the parentheses go?', intro: 'Tap two numbers to put parentheses around them and everything between. Can you make the target?',
          puzzles: [['3 + 4 × 5', 35], ['20 − 8 − 2', 14], ['2 × 6 + 4', 20], ['36 ÷ 4 + 5', 4], ['5 × 8 − 3', 25], ['2 + 3 × 4 + 1', 21]] },
        exit: [
          { q: 'Evaluate: 7 + 3 × 4', answer: 19, why: '3 × 4 = 12. 7 + 12 = 19.' },
          { q: 'Evaluate: (7 + 3) × 4', answer: 40, why: '7 + 3 = 10. 10 × 4 = 40.' },
          { q: 'Which step comes first in 40 − 16 ÷ 4?', choices: ['16 ÷ 4', '40 − 16'], answer: 0, why: 'Divide before you subtract.' }
        ]
      },
      {
        n: 2, title: 'Writing Expressions', when: 'Sep 19–21',
        goal: 'Let’s turn words into expressions and expressions into words.',
        stds: [OA2],
        targets: ['I can use the words sum, difference, product, quotient, double and half.', 'I can write an expression from words without solving it.', 'I can compare expressions without solving them.'],
        vocab: [['sum', 'The answer to addition.'], ['difference', 'The answer to subtraction.'], ['product', 'The answer to multiplication.'], ['quotient', 'The answer to division.'], ['double', 'Multiply by 2.'], ['half', 'Divide by 2.']],
        outline: [
          ['Warm-up', 10, '<b>Expressions Number Talk.</b>'],
          ['Activity 1', 15, '<b>Let’s learn the words.</b> Sum, difference, product, quotient, double, half.'],
          ['Activity 2', 15, '<b>Written expressions practice:</b> words → expression, expression → words.'],
          ['Synthesis', 5, 'When do we need parentheses in an expression?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Expressions vocabulary sheet', 'Written expressions practice', 'Math notebook'],
        notes: [
          { t: 'vocab', words: [['Sum', 'The result of adding.', 'the sum of 4 and 5 → 4 + 5'], ['Difference', 'The result of subtracting.', 'the difference of 9 and 2 → 9 − 2'], ['Product', 'The result of multiplying.', 'the product of 3 and 6 → 3 × 6'], ['Quotient', 'The result of dividing.', 'the quotient of 12 and 4 → 12 ÷ 4'], ['Double', 'Multiply by 2.', 'double 7 → 2 × 7'], ['Half', 'Divide by 2.', 'half of 10 → 10 ÷ 2']] },
          { t: 'example', title: 'Words → expression', q: '“Add 8 and 7, then multiply by 2.”', steps: ['“Add 8 and 7” comes <b>first</b>: (8 + 7).', 'Then multiply by 2: <b>(8 + 7) × 2</b>.', 'We need parentheses so the adding happens first.'] },
          { t: 'example', title: 'Compare without solving', q: 'How does 3 × (125 + 48) compare to 125 + 48?', steps: ['Look at the structure: 3 × ( … ) means 3 groups of the same amount.', 'So 3 × (125 + 48) is <b>three times as large</b> as 125 + 48.', 'We didn’t have to add 125 + 48 at all!'] },
          { t: 'fill', html: 'The answer to a multiplication problem is the [[product]]. The answer to subtraction is the [[difference]]. “Half of 20” can be written 20 ÷ [[2]].' }
        ],
        practice: [
          { q: 'Which expression shows “the sum of 6 and 9, divided by 3”?', choices: ['(6 + 9) ÷ 3', '6 + 9 ÷ 3', '6 × 9 ÷ 3'], answer: 0, why: 'The sum comes first, so it goes in parentheses.' },
          { q: 'Which expression shows “double the difference of 15 and 4”?', choices: ['2 × (15 − 4)', '2 × 15 − 4', '(15 + 4) × 2'], answer: 0, why: 'Find the difference first, then double it.' },
          { q: 'Evaluate: the product of 7 and 5, minus 10.', answer: 25, hint: '7 × 5 − 10', why: '35 − 10 = 25.' },
          { q: 'Which words match 4 × (10 + 2)?', choices: ['Four times the sum of 10 and 2', 'The sum of 4 and 10, times 2', 'The product of 4 and 10, plus 2'], answer: 0, why: 'The parentheses show a sum; then multiply by 4.' },
          { q: 'Without solving: how does 6 × (238 − 19) compare to 238 − 19?', choices: ['It is 6 times as large.', 'It is 6 more.', 'It is the same.'], answer: 0, why: '6 × (an amount) is 6 times as large as the amount.' }
        ],
        lab: { type: 'sort', title: 'Expression Match', lead: 'Words or expression — they mean the same thing.', intro: 'Sort each expression under the words it matches.', bins: ['Add 5 and 3, then multiply by 4', 'Multiply 3 by 4, then add 5', 'Half of the sum of 10 and 6'], items: [['(5 + 3) × 4', 0], ['4 × (3 + 5)', 0], ['5 + 3 × 4', 1], ['3 × 4 + 5', 1], ['(10 + 6) ÷ 2', 2], ['(6 + 10) ÷ 2', 2]], success: 'Different ways to write the same thing!' },
        exit: [
          { q: 'Write the value of: the quotient of 36 and 4, plus 2.', answer: 11, why: '36 ÷ 4 = 9. 9 + 2 = 11.' },
          { q: 'Which expression is “subtract 3 from 12, then multiply by 5”?', choices: ['(12 − 3) × 5', '12 − 3 × 5', '3 − 12 × 5'], answer: 0, why: 'Subtract first, so use parentheses.' },
          { q: 'How does 2 × (45 + 17) compare to 45 + 17?', choices: ['Twice as large', '2 more', 'Half as large'], answer: 0, why: '2 × (an amount) is double the amount.' }
        ]
      },
      {
        n: 3, title: 'Expressions Workshop', when: 'Sep 22',
        goal: 'Let’s practice writing and evaluating expressions to solve problems.',
        stds: [OA2],
        targets: ['I can write an expression to show a two-step word problem.', 'I can evaluate expressions using the order of operations.'],
        vocab: [['two-step problem', 'A problem that needs two operations.']],
        outline: [
          ['Warm-up', 10, 'Expressions Number Talk.'],
          ['Workshop', 25, '<b>Expression Sets</b> and <b>Unpacking Problems</b>. Work with your group; check with the teacher.'],
          ['Exit ticket', 10, 'Expressions exit ticket (½ page).'],
          ['Quiz (optional)', 0, 'Expressions and Order of Operations Quiz (modified version available).']
        ],
        materials: ['Expression Sets', 'Exit ticket for expressions', 'Unpacking problems (student activity sheet, page 1)', 'Investigations Unit 1 practice pages (no brackets)'],
        notes: [
          { t: 'example', title: 'Word problem → expression', q: 'Mia buys 3 packs of pencils with 8 pencils in each pack. She gives away 5 pencils. Write an expression. How many pencils does she have?', steps: ['Step 1: 3 packs of 8 → 3 × 8.', 'Step 2: gives away 5 → − 5.', 'Expression: <b>3 × 8 − 5</b>.', 'Evaluate: 24 − 5 = <b>19 pencils</b>.'] },
          { t: 'tip', html: '<b>3 Reads:</b> 1) What is happening? 2) What are the numbers? 3) What is the question?' },
          { t: 'write', q: 'Write your own two-step story for the expression (20 − 4) ÷ 2.', ph: 'I had 20 …' }
        ],
        practice: [
          { q: 'Sam has $20. He buys 2 books for $6 each. Which expression shows how much money he has left?', choices: ['20 − 2 × 6', '(20 − 2) × 6', '20 + 2 × 6'], answer: 0, why: 'He spends 2 × 6. Subtract that from 20.' },
          { q: 'Evaluate 20 − 2 × 6. How many dollars does Sam have left?', answer: 8, unit: 'dollars', why: '2 × 6 = 12. 20 − 12 = 8.' },
          { q: 'A class has 4 tables with 6 students each, and 3 more students arrive. Which expression shows the total?', choices: ['4 × 6 + 3', '4 × (6 + 3)', '4 + 6 + 3'], answer: 0, why: '4 tables of 6, plus 3 more.' },
          { q: '24 cookies are shared equally by 4 friends. Then each friend eats 2. How many cookies does each friend have left? Evaluate 24 ÷ 4 − 2.', answer: 4, why: '24 ÷ 4 = 6. 6 − 2 = 4.' },
          { q: 'Evaluate: (9 + 6) ÷ 3 × 2', answer: 10, hint: 'Parentheses, then ÷ and × from left to right.', why: '15 ÷ 3 = 5. 5 × 2 = 10.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Order of Operations', intro: 'Practice more in the Fluency Lab. Start at Level 1 and work up to Level 3.', href: '../../fluency-lab/oops.html', btn: 'Open Order of Operations practice' },
        exit: [
          { q: 'Evaluate: 6 + 18 ÷ 3', answer: 12, why: '18 ÷ 3 = 6. 6 + 6 = 12.' },
          { q: 'Evaluate: (6 + 18) ÷ 3', answer: 8, why: '24 ÷ 3 = 8.' },
          { q: 'Lia reads 15 pages a day for 4 days. Then she reads 10 more pages. Which expression shows the total?', choices: ['15 × 4 + 10', '15 × (4 + 10)', '15 + 4 + 10'], answer: 0, why: '4 days of 15, plus 10 more.' },
          { q: 'How many pages did Lia read?', answer: 70, why: '60 + 10 = 70.' }
        ]
      }
    ]
  });
})();
