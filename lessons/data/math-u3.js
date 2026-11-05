/* Math · Unit 3: Multiplying and Dividing Fractions — 19 pages (NC.5.NF.4, NC.5.NF.7), Oct 26 – Dec 1.
   Follows the BCS map: Section A mixes Investigations Unit 7 sessions with IM Lessons 1–5 (skip 6–9);
   Section B is IM Lessons 10–16 + Investigations 1.11; Section C is Lesson 18, the BCS Recipes & Fractions lesson, IM Lesson 20, and review.
   Problems are original. Type fractions like 3/4 and mixed numbers like 2 1/3. */
(function () {
  var NF4 = ['NC.5.NF.4', 'Multiply a fraction or whole number by a fraction, including mixed numbers; find area with fractional sides.'];
  var NF7 = ['NC.5.NF.7', 'Divide a unit fraction by a whole number and a whole number by a unit fraction.'];
  var NF5 = ['NC.5.NF.4 (scaling)', 'Explain how the size of a product compares to the size of a factor.'];
  var F = function (n, d) { return '<span class="fx"><span>' + n + '</span><span>' + d + '</span></span>'; };
  var area = function (a, b, c, d) { return { area: { a: a, b: b, c: c, d: d } }; };
  var o = function (p, m, t) { return [p, m, t]; };
  var plan = function (w, a1, a2, syn) { return [o('Warm-up', 10, w), o('Activity 1', 15, a1), o('Activity 2', 15, a2), o('Synthesis', 5, syn), o('Cool-down', 5, 'Exit ticket.')]; };
  var CE = 'Closest Estimate number talk (2–3 problems).';
  var FL = function (lv) { return { type: 'link', title: 'Fluency Lab: Fraction Operations', intro: 'Practice Fraction Operations, Level ' + lv + '. Aim for 9 or 10 right on the first try.', href: '../../fluency-lab/fracops.html?practice&level=' + lv, btn: 'Open Fraction Operations' }; };

  LessonKit.unit({
    id: 'math-u3', subject: 'math', short: 'Unit 3', title: 'Multiplying and Dividing Fractions', home: '../index.html', unitHref: '../unit3.html',
    lessons: [
      /* ===================== SECTION A: Fraction Multiplication ===================== */
      {
        n: 1, section: 'Section A: Multiplying Fractions', title: 'Multiplying Fractions by Fractions', when: 'Oct 26',
        goal: 'Let’s use drawings to multiply a fraction by a fraction.',
        stds: [NF4], targets: ['I can draw a picture to find a fraction of a fraction.', 'I can write a multiplication equation for my picture.'],
        vocab: [['fraction of a fraction', 'A part of a part, like 1/2 of 3/4.']],
        outline: plan(CE, '<b>Investigations Unit 7, Session 1.5:</b> Multiplying Fractions by Fractions (TE 54–61).', 'Use the chart of previous cool-downs (in place of the chart on page 59).', 'What does 1/2 × 3/4 mean in words?'),
        materials: ['Slides for Session 1.5', 'SAB pages 443–444', 'Math notebook'],
        notes: [
          { t: 'example', title: '1/2 of 3/4', fig: area(3, 4, 1, 2), steps: ['Shade 3/4 (yellow columns).', 'Take 1/2 of the yellow (green).', 'Green is 3 parts out of 8: 1/2 × 3/4 = <b>3/8</b>.'] },
          { t: 'key', label: 'Remember', html: '<p style="margin:0">“' + F(1, 2) + ' of ' + F(3, 4) + '” means ' + F(1, 2) + ' × ' + F(3, 4) + '.</p>' }
        ],
        practice: [
          { q: 'What is 1/3 of 3/5?', fig: area(3, 5, 1, 3), answer: '3/15', why: '3/15 = 1/5.' },
          { q: 'What is 1/2 of 2/3?', answer: '2/6', why: '2/6 = 1/3.' },
          { q: 'What is 2/3 of 1/4?', answer: '2/12', why: '2/12 = 1/6.' }
        ],
        lab: { type: 'area', title: 'Area Model Lab', intro: 'Shade the first fraction, then the second. Green is the product.', problems: [[3, 4, 1, 2], [3, 5, 1, 3], [1, 4, 2, 3]] },
        exit: [{ q: 'What is 1/2 of 3/5?', answer: '3/10', why: '1 × 3 = 3, 2 × 5 = 10.' }, { q: 'What is 1/4 of 2/3?', answer: '2/12', why: '2/12 = 1/6.' }]
      },
      {
        n: 2, section: 'Section A: Multiplying Fractions', title: 'Fractions of Unit Fractions', when: 'Oct 27',
        goal: 'Let’s multiply unit fractions and see a pattern.',
        stds: [NF4], targets: ['I can multiply two unit fractions.', 'I can explain why 1/a × 1/b = 1/(a × b).'],
        vocab: [['unit fraction', 'A fraction with 1 on top, like 1/5.']],
        outline: plan(CE, '<b>IM Lesson 1.</b> Find 1/2 of 1/3, 1/3 of 1/4 with diagrams.', 'Look for a pattern in the products.', 'Why is the product of two unit fractions smaller than each one?'),
        materials: ['IM Unit 3 Lesson 1 task statements'],
        notes: [
          { t: 'fig', area: { a: 1, b: 3, c: 1, d: 4 }, caption: '1/4 of 1/3 = 1/12: one green part out of 12.' },
          { t: 'key', label: 'Pattern', html: '<p style="margin:0">' + F(1, 'a') + ' × ' + F(1, 'b') + ' = ' + F(1, 'a × b') + '. The pieces get smaller!</p>' },
          { t: 'fill', html: '1/2 × 1/5 = [[1/10]]. 1/3 × 1/3 = [[1/9]].' }
        ],
        practice: [{ q: '1/4 × 1/2 = ?', answer: '1/8', why: '1 × 1 = 1, 4 × 2 = 8.' }, { q: '1/5 × 1/3 = ?', answer: '1/15', why: '5 × 3 = 15.' }, { q: '1/6 × 1/2 = ?', answer: '1/12', why: '6 × 2 = 12.' }, { q: 'Which is smaller: 1/3 or 1/3 × 1/2?', choices: ['1/3 × 1/2', '1/3'], answer: 0, why: 'Half of 1/3 is 1/6.' }],
        lab: { type: 'area', title: 'Area Model Lab', intro: 'Model each product of unit fractions.', problems: [[1, 3, 1, 4], [1, 2, 1, 5], [1, 4, 1, 4]] },
        exit: [{ q: '1/3 × 1/5 = ?', answer: '1/15', why: '3 × 5 = 15.' }, { q: '1/2 × 1/8 = ?', answer: '1/16', why: '2 × 8 = 16.' }]
      },
      {
        n: 3, section: 'Section A: Multiplying Fractions', title: 'Non-Unit Fractions', when: 'Oct 28',
        goal: 'Let’s multiply fractions that are not unit fractions.',
        stds: [NF4], targets: ['I can multiply any two fractions with a diagram.', 'I can explain where the numerator and denominator come from.'],
        vocab: [['non-unit fraction', 'A fraction with a numerator bigger than 1, like 3/4.']],
        outline: plan(CE, '<b>IM Lesson 2.</b> Use diagrams for 2/3 × 4/5.', 'Match equations and diagrams.', 'How does the diagram show the numerator? The denominator?'),
        materials: ['IM Unit 3 Lesson 2 task statements'],
        notes: [
          { t: 'example', title: '2/3 × 4/5', fig: area(4, 5, 2, 3), steps: ['4/5 of the width (yellow), then 2/3 of that (green).', 'Green: 4 × 2 = 8 parts. Whole: 5 × 3 = 15 parts.', '2/3 × 4/5 = <b>8/15</b>.'] }
        ],
        practice: [{ q: '3/4 × 2/5 = ?', fig: area(2, 5, 3, 4), answer: '6/20', why: '6/20 = 3/10.' }, { q: '2/3 × 2/3 = ?', answer: '4/9', why: '2 × 2 = 4, 3 × 3 = 9.' }, { q: '3/5 × 1/2 = ?', answer: '3/10', why: '3 × 1 = 3, 5 × 2 = 10.' }],
        lab: { type: 'area', title: 'Area Model Lab', intro: 'Model each product.', problems: [[4, 5, 2, 3], [2, 5, 3, 4], [3, 4, 3, 4]] },
        exit: [{ q: '2/5 × 3/4 = ?', answer: '6/20', why: '6/20 = 3/10.' }, { q: '4/5 × 1/3 = ?', answer: '4/15', why: '4 × 1 = 4, 5 × 3 = 15.' }]
      },
      {
        n: 4, section: 'Section A: Multiplying Fractions', title: 'Area and Fraction Products', when: 'Oct 29',
        goal: 'Let’s connect fraction multiplication to the area of rectangles.',
        stds: [NF4], targets: ['I can find the area of a rectangle with fraction side lengths.', 'I can write an equation for the area.'],
        vocab: [['area', 'Square units that cover a shape.']],
        outline: plan(CE, '<b>IM Lesson 3.</b> Area of rectangles with fraction sides.', 'Write equations for area diagrams.', 'Why is the area of a 2/3 by 3/4 rectangle less than 1 square unit?'),
        materials: ['IM Unit 3 Lesson 3 task statements', 'Grid paper'],
        notes: [{ t: 'key', label: 'Area', html: '<p style="margin:0">Area = length × width. A ' + F(2, 3) + ' ft by ' + F(3, 4) + ' ft rectangle has area ' + F(6, 12) + ' = ' + F(1, 2) + ' square foot.</p>' }],
        practice: [{ q: 'A rectangle is 1/2 m by 5/6 m. Area?', answer: '5/12', unit: 'square m', why: '1/2 × 5/6 = 5/12.' }, { q: 'A rectangle is 3/4 in by 3/4 in. Area?', answer: '9/16', unit: 'square in', why: '9/16.' }, { q: 'A garden is 2/3 yd by 6 yd. Area?', answer: 4, unit: 'square yd', why: '2/3 × 6 = 4.' }],
        exit: [{ q: 'Area of a 3/5 ft by 2/3 ft rectangle?', answer: '6/15', unit: 'square ft', why: '6/15 = 2/5.' }]
      },
      {
        n: 5, section: 'Section A: Multiplying Fractions', title: 'Rules for Multiplying Fractions', when: 'Oct 30',
        goal: 'Let’s write a rule for multiplying fractions and test it.',
        stds: [NF4], targets: ['I can multiply fractions by multiplying numerators and denominators.', 'I can simplify the product.'],
        vocab: [['rule', 'A pattern that always works.']],
        outline: plan(CE, '<b>Investigations Unit 7, Session 1.6:</b> Rules for Multiplying Fractions (TE 62–69).', 'Test the rule with area models.', 'Does the rule work for whole numbers too? (Write 3 as 3/1.)'),
        materials: ['Slides for Session 1.6', 'SAB pages 449–450, 452'],
        notes: [
          { t: 'key', label: 'The rule', html: '<p style="margin:0;font:600 20px var(--mono)">' + F('a', 'b') + ' × ' + F('c', 'd') + ' = ' + F('a × c', 'b × d') + '</p><p style="margin:6px 0 0">For a whole number, write it over 1: 4 = ' + F(4, 1) + '.</p>' },
          { t: 'example', title: '4 × 2/3', steps: ['4 = 4/1.', '4/1 × 2/3 = 8/3.', '8/3 = <b>2 2/3</b>.'] }
        ],
        practice: [{ q: '5/6 × 3/4 = ? Simplest form.', answer: '5/8', why: '15/24 = 5/8.' }, { q: '6 × 3/8 = ?', answer: '2 1/4', why: '18/8 = 2 2/8 = 2 1/4.' }, { q: '2/7 × 7/10 = ? Simplest form.', answer: '1/5', why: '14/70 = 1/5.' }],
        lab: FL(3),
        exit: [{ q: '3/8 × 4/5 = ? Simplest form.', answer: '3/10', why: '12/40 = 3/10.' }, { q: '5 × 2/9 = ?', answer: '1 1/9', why: '10/9 = 1 1/9.' }]
      },
      {
        n: 6, section: 'Section A: Multiplying Fractions', title: 'Multiplying with Mixed Numbers', when: 'Nov 2',
        goal: 'Let’s multiply a fraction or whole number by a mixed number.',
        stds: [NF4], targets: ['I can multiply a whole number by a mixed number using partial products.', 'I can multiply a fraction by a mixed number.'],
        vocab: [['mixed number', 'A whole number and a fraction, like 2 1/2.'], ['partial products', 'Parts of a product you add together.']],
        outline: plan(CE, '<b>IM Lesson 4.</b> Split the mixed number: whole part + fraction part.', 'Extra practice.', 'Two ways: partial products or change to a fraction greater than 1.'),
        materials: ['IM Unit 3 Lesson 4', 'Extra practice page'],
        notes: [
          { t: 'example', title: '1/2 × 3 1/4 — two ways', steps: ['<b>Partial products:</b> 1/2 × 3 = 3/2 and 1/2 × 1/4 = 1/8. Add: 12/8 + 1/8 = 13/8.', '<b>Fraction first:</b> 3 1/4 = 13/4. 1/2 × 13/4 = 13/8.', 'Both give <b>13/8 = 1 5/8</b>.'] },
          { t: 'tip', html: 'The Checkpoint skips mixed × mixed (question 3). Focus on whole or fraction × mixed number.' }
        ],
        practice: [{ q: '3 × 2 1/2 = ?', answer: '7 1/2', why: '6 + 3/2 = 7 1/2.' }, { q: '1/3 × 4 1/2 = ?', answer: '1 1/2', why: '4 1/2 = 9/2. 9/6 = 1 1/2.' }, { q: '2/3 × 1 1/2 = ?', answer: 1, why: '2/3 × 3/2 = 6/6 = 1.' }],
        exit: [{ q: '4 × 1 3/4 = ?', answer: 7, why: '4 + 3 = 7.' }, { q: '1/2 × 2 2/3 = ?', answer: '1 1/3', why: '8/3 × 1/2 = 8/6 = 1 1/3.' }]
      },
      {
        n: 7, section: 'Section A: Multiplying Fractions', title: 'Fraction Multiplication Practice', when: 'Nov 3',
        goal: 'Let’s practice and choose strategies for multiplying fractions.',
        stds: [NF4], targets: ['I can choose a strategy for multiplying fractions.', 'I can estimate to check my answer.'],
        vocab: [['estimate', 'A close guess using friendly numbers.']],
        outline: plan(CE, '<b>Investigations Unit 7, Session 1.7.</b>', 'Partner practice with estimation.', 'How does estimating help you catch mistakes?'),
        materials: ['Slides for Session 1.7', 'SAB pages 453–455'],
        notes: [{ t: 'tip', html: '<b>Estimate first:</b> 3/4 × 7 is a bit less than 7, about 5. The exact answer, 21/4 = 5 1/4, makes sense.' }],
        practice: [{ q: '3/4 × 7 = ?', answer: '5 1/4', why: '21/4 = 5 1/4.' }, { q: '2/5 × 5/6 = ? Simplest form.', answer: '1/3', why: '10/30 = 1/3.' }, { q: 'Which is the best estimate for 9/10 × 8?', choices: ['A little less than 8', 'About 80', 'About 1'], answer: 0, why: '9/10 is close to 1.' }],
        lab: FL(3),
        exit: [{ q: '5/8 × 4 = ?', answer: '2 1/2', why: '20/8 = 2 1/2.' }, { q: '3/10 × 2/3 = ? Simplest form.', answer: '1/5', why: '6/30 = 1/5.' }]
      },
      {
        n: 8, section: 'Section A: Multiplying Fractions', title: 'Is the Product Bigger or Smaller?', when: 'Nov 4',
        goal: 'Let’s predict whether a product will be bigger or smaller than a factor.',
        stds: [NF4, NF5], targets: ['I can tell if a product is greater or less than a factor without multiplying.', 'I can explain why.'],
        vocab: [['scaling', 'Resizing by multiplying.'], ['factor', 'A number being multiplied.']],
        outline: plan(CE, '<b>IM Lesson 5, Activity 1</b> (keep).', 'Do the BCS replacement activity in place of Activity 2.', 'Multiplying by a fraction less than 1 makes it smaller. Greater than 1? Bigger.'),
        materials: ['IM Unit 3 Lesson 5 (Activity 1)', 'Replacement for Activity 2 (BCS)'],
        notes: [
          { t: 'key', label: 'Scaling rule', html: '<ul style="margin:0"><li>× a fraction <b>less than 1</b> → product is <b>smaller</b> than the other factor.</li><li>× <b>1</b> (like 4/4) → product is the <b>same</b>.</li><li>× a number <b>greater than 1</b> (like 3/2) → product is <b>bigger</b>.</li></ul>' }
        ],
        practice: [
          { q: 'Without multiplying: 3/5 × 12 is … 12.', choices: ['less than', 'greater than', 'equal to'], answer: 0, why: '3/5 < 1.' },
          { q: 'Without multiplying: 7/4 × 9 is … 9.', choices: ['greater than', 'less than', 'equal to'], answer: 0, why: '7/4 > 1.' },
          { q: 'Without multiplying: 6/6 × 15 is … 15.', choices: ['equal to', 'less than', 'greater than'], answer: 0, why: '6/6 = 1.' },
          { type: 'sort', q: 'Sort: is the product greater or less than 20?', bins: ['Less than 20', 'Greater than 20'], items: [['2/3 × 20', 0], ['9/10 × 20', 0], ['1 1/2 × 20', 1], ['5/4 × 20', 1]], why: 'Compare the fraction to 1.' }
        ],
        exit: [{ q: 'Is 4/9 × 50 greater or less than 50?', choices: ['Less', 'Greater'], answer: 0, why: '4/9 < 1.' }, { q: 'Is 2 1/3 × 8 greater or less than 8?', choices: ['Greater', 'Less'], answer: 0, why: '2 1/3 > 1.' }]
      },

      /* ===================== SECTION B: Fraction Division (NF.7) ===================== */
      {
        n: 9, section: 'Section B: Dividing with Unit Fractions', title: 'How Many Pieces Fit?', when: 'Nov 9',
        goal: 'Let’s divide a whole number by a unit fraction.',
        stds: [NF7], targets: ['I can find how many unit fractions fit in a whole number.', 'I can write a division equation like 3 ÷ 1/4 = 12.'],
        vocab: [['divide', 'Find how many groups, or how much in each group.']],
        outline: plan('How many 1/2s are in 4?', '<b>IM Lessons 10–11.</b> Use diagrams to divide whole numbers by unit fractions.', 'Write equations.', 'Why is 3 ÷ 1/4 bigger than 3?'),
        materials: ['IM Unit 3 Lessons 10–11'],
        notes: [
          { t: 'example', title: '3 ÷ 1/4', fig: { strip: { parts: 4, shaded: 12, wholes: 3 } }, steps: ['Ask: how many 1/4s fit in 3?', 'Each whole has 4 fourths.', '3 wholes have 3 × 4 = <b>12</b> fourths. So 3 ÷ 1/4 = 12.'] },
          { t: 'key', label: 'Whole ÷ unit fraction', html: '<p style="margin:0">a ÷ ' + F(1, 'b') + ' = a × b. The answer is <b>bigger</b> than a.</p>' }
        ],
        practice: [{ q: '2 ÷ 1/3 = ?', answer: 6, why: '2 × 3 = 6.' }, { q: '5 ÷ 1/2 = ?', answer: 10, why: '5 × 2 = 10.' }, { q: 'How many 1/8-cup scoops are in 3 cups?', answer: 24, why: '3 × 8 = 24.' }],
        lab: { type: 'fdiv', title: 'Fraction Division Lab', intro: 'See how many unit fractions fit.', problems: [['w', 3, 4], ['w', 2, 3], ['w', 4, 2]] },
        exit: [{ q: '4 ÷ 1/5 = ?', answer: 20, why: '4 × 5 = 20.' }, { q: '6 ÷ 1/2 = ?', answer: 12, why: '6 × 2 = 12.' }]
      },
      {
        n: 10, section: 'Section B: Dividing with Unit Fractions', title: 'Sharing a Unit Fraction', when: 'Nov 10',
        goal: 'Let’s divide a unit fraction by a whole number.',
        stds: [NF7], targets: ['I can divide a unit fraction into equal parts.', 'I can write an equation like 1/3 ÷ 4 = 1/12.'],
        vocab: [['equal parts', 'Parts that are the same size.']],
        outline: plan('If 2 people share 1/2 of a pizza, how much does each get?', '<b>IM Lesson 12.</b> Share unit fractions with diagrams.', 'Write equations.', 'Why is 1/3 ÷ 4 smaller than 1/3?'),
        materials: ['IM Unit 3 Lesson 12'],
        notes: [
          { t: 'example', title: '1/3 ÷ 4', fig: area(1, 3, 1, 4), steps: ['Start with 1/3 of the whole (one column).', 'Split it into 4 equal parts.', 'One part is 1 of 12 in the whole: <b>1/12</b>.'] },
          { t: 'key', label: 'Unit fraction ÷ whole', html: '<p style="margin:0">' + F(1, 'b') + ' ÷ n = ' + F(1, 'b × n') + '. The answer is <b>smaller</b>.</p>' }
        ],
        practice: [{ q: '1/2 ÷ 3 = ?', answer: '1/6', why: '2 × 3 = 6.' }, { q: '1/4 ÷ 2 = ?', answer: '1/8', why: '4 × 2 = 8.' }, { q: '3 friends share 1/2 of a cake. How much does each get?', answer: '1/6', why: '1/2 ÷ 3 = 1/6.' }],
        lab: { type: 'fdiv', title: 'Fraction Division Lab', intro: 'Split the unit fraction into equal parts.', problems: [['u', 3, 4], ['u', 2, 3], ['u', 4, 2]] },
        exit: [{ q: '1/5 ÷ 2 = ?', answer: '1/10', why: '5 × 2 = 10.' }, { q: '1/3 ÷ 3 = ?', answer: '1/9', why: '3 × 3 = 9.' }]
      },
      {
        n: 11, section: 'Section B: Dividing with Unit Fractions', title: 'Division Stories', when: 'Nov 11',
        goal: 'Let’s decide which kind of fraction division a story shows.',
        stds: [NF7], targets: ['I can tell if a story asks “how many groups?” or “how much in each group?”', 'I can solve fraction division stories.'],
        vocab: [['how many groups', 'Divide to count groups (whole ÷ unit fraction).'], ['how much in each', 'Divide to share (unit fraction ÷ whole).']],
        outline: plan('Which story matches 2 ÷ 1/3?', '<b>IM Lesson 13.</b> Match stories and equations.', 'Solve with diagrams.', 'How do you know which number to divide?'),
        materials: ['IM Unit 3 Lesson 13'],
        notes: [
          { t: 'key', label: 'Two kinds of stories', html: '<ul style="margin:0"><li><b>4 cups of rice, 1/2 cup per bag. How many bags?</b> → 4 ÷ 1/2 = 8 bags</li><li><b>1/2 pound of clay shared by 4 kids. How much each?</b> → 1/2 ÷ 4 = 1/8 pound</li></ul>' }
        ],
        practice: [{ q: '5 yards of ribbon cut into 1/3-yard pieces. How many pieces?', answer: 15, why: '5 ÷ 1/3 = 15.' }, { q: '1/4 gallon of juice shared by 2 kids. How much each?', answer: '1/8', unit: 'gallon', why: '1/4 ÷ 2 = 1/8.' }, { q: 'Which equation matches: “How many 1/6-hour lessons fit in 2 hours?”', choices: ['2 ÷ 1/6', '1/6 ÷ 2', '2 × 1/6'], answer: 0, why: 'Count how many 1/6s are in 2.' }],
        exit: [{ q: '3 pounds of trail mix in 1/4-pound bags. How many bags?', answer: 12, why: '3 × 4 = 12.' }, { q: '1/3 of a pizza shared by 2 friends. How much each?', answer: '1/6', why: '1/3 ÷ 2 = 1/6.' }]
      },
      {
        n: 12, section: 'Section B: Dividing with Unit Fractions', title: 'Multiplication and Division Are Related', when: 'Nov 12',
        goal: 'Let’s use multiplication to check fraction division.',
        stds: [NF7], targets: ['I can check a fraction division answer with multiplication.'],
        vocab: [['inverse', 'Opposite operations that undo each other.']],
        outline: plan('12 ÷ 3 = 4 because 4 × 3 = 12. Does that work with fractions?', '<b>IM Lesson 14.</b> Relate division to multiplication.', 'Check answers by multiplying.', 'How can you always check a division answer?'),
        materials: ['IM Unit 3 Lesson 14'],
        notes: [{ t: 'example', title: 'Check with multiplication', steps: ['3 ÷ 1/4 = 12. Check: 12 × 1/4 = 12/4 = 3 ✓', '1/2 ÷ 4 = 1/8. Check: 1/8 × 4 = 4/8 = 1/2 ✓'] }],
        practice: [{ q: '2 ÷ 1/5 = 10. Which multiplication checks it?', choices: ['10 × 1/5 = 2', '2 × 1/5 = 10', '10 × 5 = 2'], answer: 0, why: 'Quotient × divisor = dividend.' }, { q: '1/6 ÷ 2 = ?', answer: '1/12', why: 'Check: 1/12 × 2 = 2/12 = 1/6.' }, { q: '7 ÷ 1/3 = ?', answer: 21, why: 'Check: 21 × 1/3 = 7.' }],
        exit: [{ q: '1/2 ÷ 5 = ?', answer: '1/10', why: '1/10 × 5 = 1/2.' }, { q: '4 ÷ 1/6 = ?', answer: 24, why: '24 × 1/6 = 4.' }]
      },
      {
        n: 13, section: 'Section B: Dividing with Unit Fractions', title: 'Fraction Division in Context', when: 'Nov 13',
        goal: 'Let’s solve real problems with fraction division.',
        stds: [NF7], targets: ['I can solve real problems with fraction division.', 'I can explain if my answer makes sense.'],
        vocab: [['context', 'The real-world story around a problem.']],
        outline: plan(CE, '<b>IM Lessons 15–16.</b> Problems in context.', 'Write your own fraction division story.', 'Does the answer make sense in the story?'),
        materials: ['IM Unit 3 Lessons 15–16'],
        notes: [{ t: 'write', q: 'Write a story for 4 ÷ 1/3. Solve it.', ph: 'I have 4 … Each … is 1/3 …' }],
        practice: [{ q: 'A runner runs 1/4 mile laps. How many laps in 3 miles?', answer: 12, unit: 'laps', why: '3 ÷ 1/4 = 12.' }, { q: '1/2 of a pan of brownies is shared by 6 kids. What fraction of the pan does each get?', answer: '1/12', why: '1/2 ÷ 6 = 1/12.' }, { q: 'A 6-foot board is cut into 1/2-foot pieces. How many pieces?', answer: 12, why: '6 × 2 = 12.' }],
        lab: { type: 'fdiv', title: 'Fraction Division Lab', intro: 'Mixed practice.', problems: [['w', 3, 4], ['u', 2, 6], ['w', 6, 2], ['u', 4, 3]] },
        exit: [{ q: '5 cups of flour, 1/2 cup per batch. How many batches?', answer: 10, why: '5 × 2 = 10.' }, { q: '1/3 of a garden is split into 4 equal rows. What fraction of the garden is each row?', answer: '1/12', why: '1/3 ÷ 4 = 1/12.' }]
      },
      {
        n: 14, section: 'Section B: Dividing with Unit Fractions', title: 'Investigations: Division Problems', when: 'Nov 16',
        goal: 'Let’s solve more fraction division problems with our own strategies.',
        stds: [NF7], targets: ['I can solve fraction division problems and show my strategy.'],
        vocab: [['strategy', 'A plan for solving a problem.']],
        outline: plan(CE, '<b>Investigations Unit 7, Lesson 1.11</b> (workbook pages 469–470).', 'Share strategies.', 'Which strategy was most efficient?'),
        materials: ['Investigations Unit 7 Lesson 1.11', 'Workbook pages 469–470'],
        notes: [{ t: 'key', label: 'Strategies', html: '<ul style="margin:0"><li>Draw a diagram (strip or area model)</li><li>Think multiplication: ? × 1/4 = 3</li><li>Count unit fractions in one whole, then multiply</li></ul>' }],
        practice: [{ q: '8 ÷ 1/4 = ?', answer: 32, why: '8 × 4 = 32.' }, { q: '1/8 ÷ 2 = ?', answer: '1/16', why: '8 × 2 = 16.' }, { q: '9 ÷ 1/3 = ?', answer: 27, why: '9 × 3 = 27.' }],
        lab: FL(4),
        exit: [{ q: '1/4 ÷ 4 = ?', answer: '1/16', why: '4 × 4 = 16.' }, { q: '10 ÷ 1/2 = ?', answer: 20, why: '10 × 2 = 20.' }]
      },

      /* ===================== SECTION C: Problem Solving ===================== */
      {
        n: 15, section: 'Section C: Problem Solving with Fractions', title: 'Multiply or Divide?', when: 'Nov 17',
        goal: 'Let’s decide whether to multiply or divide in fraction problems.',
        stds: [NF4, NF7], targets: ['I can choose multiplication or division for a fraction story.'],
        vocab: [['operation', '+, −, ×, or ÷.']],
        outline: plan(CE, '<b>IM Lesson 18.</b>', 'Sort stories: multiply or divide?', 'What words or ideas help you decide?'),
        materials: ['IM Unit 3 Lesson 18'],
        notes: [{ t: 'key', label: 'Decide', html: '<ul style="margin:0"><li>“a fraction <b>of</b>” → multiply</li><li>“how many <b>fit</b>” or “how many <b>groups</b>” → divide</li><li>“<b>share</b> equally” → divide</li></ul>' }],
        practice: [{ type: 'sort', q: 'Multiply or divide?', bins: ['Multiply', 'Divide'], items: [['2/3 of 12 apples', 0], ['3 groups of 3/4 cup', 0], ['How many 1/2-hour shows fit in 3 hours?', 1], ['1/4 of a pie shared by 3 kids', 1]], why: '“Of” and “groups of” → multiply. “Fit” and “share” → divide.' }, { q: 'Max walks 3/4 mile each day for 5 days. How far?', answer: '3 3/4', unit: 'miles', why: '5 × 3/4 = 15/4.' }, { q: 'How many 1/3-cup servings are in 4 cups?', answer: 12, why: '4 ÷ 1/3 = 12.' }],
        exit: [{ q: '1/2 of 3/4 = ?', answer: '3/8', why: '1/2 × 3/4 = 3/8.' }, { q: '2 ÷ 1/8 = ?', answer: 16, why: '2 × 8 = 16.' }]
      },
      {
        n: 16, section: 'Section C: Problem Solving with Fractions', title: 'Recipes and Fractions', when: 'Nov 18–19',
        goal: 'Let’s scale recipes up and down with fraction multiplication.',
        stds: [NF4], targets: ['I can multiply fractions to change a recipe.', 'I can decide if a recipe amount makes sense.'],
        vocab: [['scale a recipe', 'Make more or less by multiplying every amount.']],
        outline: [o('Warm-up', 10, 'Look at the warm-up image (online lesson). What do you notice?'), o('Activity', 30, '<b>BCS Lesson 20: Recipes &amp; Fractions</b> (replaces IM Lesson 19). Use the student pages and Recipe and Fractions handout.'), o('Synthesis', 5, 'What happens to every amount when you make half a recipe?'), o('Cool-down', 5, 'Exit ticket.')],
        materials: ['Lesson 20 (Recipes & Fractions) student pages', 'Recipe and Fractions handout', 'Online lesson with a better image of the warm-up'],
        notes: [{ t: 'fig', table: { caption: 'Pancake recipe (makes 8)', head: ['Ingredient', 'Amount'], leftCol: true, rows: [['Flour', '1 1/2 cups'], ['Milk', '3/4 cup'], ['Sugar', '1/4 cup'], ['Eggs', '2']] } }, { t: 'example', title: 'Make half the recipe', steps: ['Multiply each amount by 1/2.', 'Flour: 1/2 × 1 1/2 = 1/2 × 3/2 = 3/4 cup.', 'Milk: 1/2 × 3/4 = 3/8 cup. Sugar: 1/2 × 1/4 = 1/8 cup. Eggs: 1.'] }],
        practice: [{ q: 'Half the pancake recipe: how much milk? (1/2 × 3/4)', answer: '3/8', unit: 'cup', why: '3/8 cup.' }, { q: 'Triple the recipe: how much sugar? (3 × 1/4)', answer: '3/4', unit: 'cup', why: '3/4 cup.' }, { q: 'Double the recipe: how much flour? (2 × 1 1/2)', answer: 3, unit: 'cups', why: '3 cups.' }],
        exit: [{ q: 'A recipe uses 2/3 cup of oats. Make 1/2 of it. How many cups?', answer: '1/3', why: '1/2 × 2/3 = 2/6 = 1/3.' }, { q: 'A recipe uses 3/4 tsp salt. Make 4 times as much. How many tsp?', answer: 3, why: '4 × 3/4 = 3.' }]
      },
      {
        n: 17, section: 'Section C: Problem Solving with Fractions', title: 'Putting It All Together', when: 'Nov 20–23',
        goal: 'Let’s solve multi-step problems with fraction multiplication and division.',
        stds: [NF4, NF7], targets: ['I can solve multi-step fraction problems.'],
        vocab: [['multi-step', 'Takes more than one step.']],
        outline: plan(CE, '<b>IM Lesson 20</b> (must do).', 'Multiplying fraction tasks with models.', 'Which step did you do first? Why?'),
        materials: ['IM Unit 3 Lesson 20', 'Multiplying fraction tasks with models', 'Investigations workbook pages 465–466, 472'],
        notes: [{ t: 'example', title: 'Two steps', q: 'Ana has 3 cups of juice. She drinks 1/3 of it. She pours the rest into 1/2-cup glasses. How many glasses?', steps: ['She drinks 1/3 × 3 = 1 cup. 3 − 1 = 2 cups left.', '2 ÷ 1/2 = <b>4 glasses</b>.'] }],
        practice: [{ q: 'A 4-foot rope. Lee cuts off 1/2 of it, then cuts the rest into 1/4-foot pieces. How many pieces?', answer: 8, why: '4 − 2 = 2 feet. 2 ÷ 1/4 = 8.' }, { q: 'A pan is 3/4 full of lasagna. Half of that is eaten. What fraction of the pan is left?', answer: '3/8', why: '1/2 × 3/4 = 3/8 left.' }, { q: 'Sam has 6 cups of rice. He uses 2/3 of it. How many cups did he use?', answer: 4, why: '2/3 × 6 = 4.' }],
        exit: [{ q: 'There are 5 pizzas. Kids eat 3/5 of them. How many pizzas are eaten?', answer: 3, why: '3/5 × 5 = 3.' }, { q: 'The other 2 pizzas are cut into 1/8 slices. How many slices?', answer: 16, why: '2 ÷ 1/8 = 16.' }]
      },
      {
        n: 18, section: 'Section C: Problem Solving with Fractions', title: 'Unit 3 Review', when: 'Nov 30',
        goal: 'Let’s review the whole unit.',
        stds: [NF4, NF7], targets: ['I can multiply fractions and mixed numbers.', 'I can divide with unit fractions.'],
        vocab: [['review', 'Look back at what you learned.']],
        outline: [o('Review', 40, 'Review day (from skipping Lesson 17). Use the Drew Polly questions for NF.4 and NF.7.'), o('Exit ticket', 10, 'Exit ticket.')],
        materials: ['Drew Polly assessment items (NF.4, NF.7)', 'Unit 3 practice problems'],
        notes: [{ t: 'key', label: 'Unit 3 big ideas', html: '<ol style="margin:0"><li>' + F('a', 'b') + ' × ' + F('c', 'd') + ' = ' + F('a × c', 'b × d') + '</li><li>× a fraction less than 1 → smaller; greater than 1 → bigger.</li><li>a ÷ ' + F(1, 'b') + ' = a × b (how many fit?)</li><li>' + F(1, 'b') + ' ÷ n = ' + F(1, 'b × n') + ' (share it)</li></ol>' }],
        practice: [{ q: '3/4 × 2/3 = ? Simplest form.', answer: '1/2', why: '6/12 = 1/2.' }, { q: '5 × 3/10 = ?', answer: '1 1/2', why: '15/10 = 1 1/2.' }, { q: '3 ÷ 1/6 = ?', answer: 18, why: '3 × 6 = 18.' }, { q: '1/5 ÷ 4 = ?', answer: '1/20', why: '5 × 4 = 20.' }, { q: 'Is 5/8 × 40 greater or less than 40?', choices: ['Less', 'Greater'], answer: 0, why: '5/8 < 1.' }],
        lab: FL(4),
        exit: [{ q: '2/5 × 1 1/2 = ? Simplest form.', answer: '3/5', why: '2/5 × 3/2 = 6/10 = 3/5.' }, { q: '6 ÷ 1/3 = ?', answer: 18, why: '6 × 3 = 18.' }, { q: '1/2 ÷ 6 = ?', answer: '1/12', why: '2 × 6 = 12.' }]
      },
      {
        n: 19, section: 'Section C: Problem Solving with Fractions', title: 'Unit 3 Test Prep', when: 'Dec 1',
        goal: 'Let’s get ready for the Unit 3 test.',
        stds: [NF4, NF7], targets: ['I can show what I know about multiplying and dividing fractions.'],
        vocab: [['simplest form', 'Simplify before choosing an answer.']],
        outline: [o('Warm-up', 10, 'Closest Estimate.'), o('Practice', 20, 'Practice on this page.'), o('Unit test', 0, 'SchoolNet Unit 3 assessment.')],
        materials: ['Unit 3 practice problems'],
        notes: [{ t: 'tip', html: '<b>Test tips:</b> Type mixed numbers with a space, like <b>2 1/3</b>. Simplify. Estimate to check your answer makes sense.' }],
        practice: [{ q: '4/9 × 3/8 = ? Simplest form.', answer: '1/6', why: '12/72 = 1/6.' }, { q: '2 × 2 3/4 = ?', answer: '5 1/2', why: '4 + 6/4 = 5 1/2.' }, { q: 'How many 1/4-mile laps in 5 miles?', answer: 20, why: '5 × 4 = 20.' }, { q: '1/3 of a cake shared by 5 people. What fraction of the cake does each get?', answer: '1/15', why: '1/3 ÷ 5 = 1/15.' }],
        exit: [{ q: '3/10 × 5 = ?', answer: '1 1/2', why: '15/10 = 1 1/2.' }, { q: '1/6 ÷ 3 = ?', answer: '1/18', why: '6 × 3 = 18.' }, { q: '4 ÷ 1/5 = ?', answer: 20, why: '4 × 5 = 20.' }]
      }
    ]
  });
})();
