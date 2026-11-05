/* Math · Unit 2: Fractions as Quotients and Fraction Multiplication — 20 pages (NC.5.NF.3, NC.5.NF.4, NC.5.OA.2), Sep 23 – Oct 23.
   Follows the BCS map: 3 days of pre-work, Section A (1–5), Section B (6–8 + 2 bonus lessons), Section C (9–15).
   Problems are original. Fraction answers can be typed like 3/4 or 2 1/3. */
(function () {
  var NF3 = ['NC.5.NF.3', 'Interpret a fraction as division of the numerator by the denominator (a/b = a ÷ b), and solve word problems where dividing whole numbers gives a fraction or mixed number.'];
  var NF4 = ['NC.5.NF.4', 'Multiply a fraction or whole number by a fraction, including finding the area of a rectangle with fractional side lengths.'];
  var OA2 = ['NC.5.OA.2', 'Write and evaluate expressions (connection).'];
  var PRE = ['NC.4.NF.1 · NC.4.NF.3', 'Review from 4th grade: equivalent fractions and mixed numbers (supports NC.5.NF.1 and NC.5.NF.3).'];
  var F = function (n, d) { return '<span class="fx"><span>' + n + '</span><span>' + d + '</span></span>'; };
  var strip = function (parts, shaded, wholes, cap) { return { strip: { parts: parts, shaded: shaded, wholes: wholes || 1 }, caption: cap }; };
  var area = function (a, b, c, d, cap) { return { area: { a: a, b: b, c: c, d: d }, caption: cap }; };
  var o = function (p, m, t) { return [p, m, t]; };
  var plan = function (w, a1, a2, syn) { return [o('Warm-up', 10, w), o('Activity 1', 15, a1), o('Activity 2', 15, a2), o('Synthesis', 5, syn), o('Cool-down', 5, 'Exit ticket.')]; };
  var MAT = function (extra) { return ['Math notebook', 'IM Unit 2 student task statements'].concat(extra || []); };

  LessonKit.unit({
    id: 'math-u2', subject: 'math', short: 'Unit 2', title: 'Fractions as Quotients and Fraction Multiplication', home: '../index.html', unitHref: '../unit2.html',
    lessons: [
      /* ===================== PRE-WORK (not IM lessons) ===================== */
      {
        n: 1, section: 'Pre-Work: Fraction Review', title: 'Fraction Basics', when: 'Sep 23',
        goal: 'Let’s review what fractions mean and different ways to show them.',
        stds: [PRE],
        targets: ['I can name the numerator and denominator.', 'I can show a fraction with a fraction strip and on a number line.'],
        vocab: [['numerator', 'The top number: how many parts we have.'], ['denominator', 'The bottom number: how many equal parts make one whole.'], ['fraction bar', 'The line between the numerator and denominator.']],
        outline: plan('Pre-assessment: practice problems from Section A (#1–6).', '<b>Let’s review fraction words.</b> Numerator, denominator, fraction bar.', '<b>Let’s show fractions</b> with strips, number lines and pictures.', 'What are some ways we can show a fraction?'),
        materials: MAT(['Section A practice problems #1–6 (pre-assessment)', 'Fraction strips']),
        notes: [
          { t: 'p', html: '<p>A fraction names <b>equal parts</b> of a whole. In ' + F(3, 4) + ', the whole is cut into <b>4</b> equal parts, and we have <b>3</b> of them.</p>' },
          { t: 'fig', strip: { parts: 4, shaded: 3 }, caption: '3/4: 3 of 4 equal parts are shaded.' },
          { t: 'vocab', words: [['Numerator', 'The top number. It counts the parts we have.', 'In 3/4, the numerator is 3.'], ['Denominator', 'The bottom number. It tells how many equal parts make 1 whole.', 'In 3/4, the denominator is 4.'], ['Unit fraction', 'A fraction with 1 on top.', '1/4, 1/8, 1/2']] },
          { t: 'fill', html: 'In the fraction 5/8, the numerator is [[5]] and the denominator is [[8]]. The whole is cut into [[8]] equal parts.' },
          { t: 'tip', html: '<b>Number line:</b> To show 3/4, split the space from 0 to 1 into 4 equal jumps. Count 3 jumps.' }
        ],
        practice: [
          { q: 'What fraction is shaded?', fig: strip(6, 5), answer: '5/6', why: '5 of 6 equal parts.' },
          { q: 'What fraction is shaded?', fig: strip(8, 3), answer: '3/8', why: '3 of 8 equal parts.' },
          { q: 'In ' + F(7, 10) + ', what does the 10 tell you?', choices: ['The whole is cut into 10 equal parts.', 'We have 10 parts.', 'There are 10 wholes.'], answer: 0, why: 'The denominator tells how many equal parts make one whole.' },
          { q: 'Which fraction is a <b>unit fraction</b>?', choices: ['1/5', '2/5', '5/5'], answer: 0, why: 'A unit fraction has 1 in the numerator.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Fraction Basics', intro: 'Warm up your fraction skills with the Fraction Basics module, Level 1.', href: '../../fluency-lab/fracbasics.html?practice&level=1', btn: 'Open Fraction Basics' },
        exit: [
          { q: 'What fraction is shaded?', fig: strip(5, 2), answer: '2/5', why: '2 of 5 equal parts.' },
          { q: 'Which number is the denominator in 4/9?', answer: 9, why: 'The bottom number.' },
          { q: 'How many fourths make 1 whole?', answer: 4, why: '4/4 = 1.' }
        ]
      },
      {
        n: 2, section: 'Pre-Work: Fraction Review', title: 'Equivalent Fractions and Simplest Form', when: 'Sep 24',
        goal: 'Let’s find equivalent fractions and write fractions in simplest form.',
        stds: [PRE],
        targets: ['I can find equivalent fractions by multiplying or dividing the top and bottom by the same number.', 'I can write a fraction in simplest form.'],
        vocab: [['equivalent fractions', 'Fractions that name the same amount, like 1/2 and 2/4.'], ['simplest form', 'A fraction where the top and bottom can’t be divided by the same number (except 1).']],
        outline: plan('Which One Doesn’t Belong? 1/2, 2/4, 3/6, 3/5.', '<b>Let’s find equivalent fractions</b> on grid paper (Investigations Unit 3, Session 1.2).', '<b>Let’s simplify.</b> Divide the top and bottom by the same number.', 'Build a class conjecture chart about fractions.'),
        materials: MAT(['Grid paper', 'Investigations Unit 3 Session 1.2 (student pages 131–135 or modified version)', 'Conjecture chart (Session 1.4, page 47)']),
        notes: [
          { t: 'fig', html: FIG2(), caption: '1/2, 2/4 and 4/8 cover the same amount. They are equivalent.' },
          { t: 'key', label: 'Equivalent fractions', html: '<p style="margin:0">Multiply (or divide) the numerator <b>and</b> the denominator by the <b>same</b> number: ' + F(2, 3) + ' = ' + F('2 × 4', '3 × 4') + ' = ' + F(8, 12) + '</p>' },
          { t: 'example', title: 'Simplify 12/18', steps: ['Find a number that divides 12 and 18. Try 6.', '12 ÷ 6 = 2 and 18 ÷ 6 = 3.', '12/18 = <b>2/3</b>. 2 and 3 have no common factor except 1, so it is in simplest form.'] },
          { t: 'fill', html: '1/2 = [[2]]/4 = [[4]]/8. To simplify 6/8, divide the top and bottom by [[2]] to get [[3/4]].' }
        ],
        practice: [
          { q: 'Fill in: 3/5 = ?/10', answer: 6, why: '5 × 2 = 10, so 3 × 2 = 6.' },
          { q: 'Fill in: 2/3 = 8/?', answer: 12, why: '2 × 4 = 8, so 3 × 4 = 12.' },
          { q: 'Write 10/15 in simplest form.', answer: '2/3', hint: 'Divide the top and bottom by 5.', why: '10 ÷ 5 = 2, 15 ÷ 5 = 3.' },
          { q: 'Write 6/9 in simplest form.', answer: '2/3', why: 'Divide both by 3.' },
          { q: 'Which fraction is <b>not</b> equivalent to 1/2?', choices: ['3/5', '4/8', '5/10'], answer: 0, why: '3/5 is more than one half.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Equivalent Fractions', intro: 'Practice Levels 1 and 2 of Fraction Basics.', href: '../../fluency-lab/fracbasics.html?practice&level=2', btn: 'Open Fraction Basics' },
        exit: [
          { q: 'Fill in: 3/4 = ?/12', answer: 9, why: '4 × 3 = 12, so 3 × 3 = 9.' },
          { q: 'Write 8/12 in simplest form.', answer: '2/3', why: 'Divide both by 4.' },
          { q: 'Are 2/6 and 1/3 equivalent?', choices: ['Yes', 'No'], answer: 0, why: '2/6 ÷ 2/2 = 1/3.' }
        ]
      },
      {
        n: 3, section: 'Pre-Work: Fraction Review', title: 'Improper Fractions and Mixed Numbers', when: 'Sep 25',
        goal: 'Let’s change fractions greater than 1 into mixed numbers and back.',
        stds: [PRE],
        targets: ['I can write a fraction greater than 1 as a mixed number.', 'I can write a mixed number as a fraction.'],
        vocab: [['fraction greater than 1', 'A fraction where the top is bigger than the bottom, like 7/4. (Sometimes called improper.)'], ['mixed number', 'A whole number and a fraction, like 1 3/4.'], ['whole number', '0, 1, 2, 3 …']],
        outline: plan('How many wholes are in 9/4? Use a picture.', '<b>Let’s change fractions greater than 1 to mixed numbers.</b>', '<b>Let’s go the other way:</b> mixed numbers to fractions.', 'How are 7/4 and 1 3/4 the same?'),
        materials: MAT(['Improper fractions to mixed numbers practice', 'Fraction strips']),
        notes: [
          { t: 'fig', strip: { parts: 4, shaded: 7, wholes: 2 }, caption: '7/4 = 4/4 + 3/4 = 1 3/4' },
          { t: 'example', title: 'Fraction → mixed number: 17/5', steps: ['How many groups of 5 are in 17? 17 ÷ 5 = 3 with 2 left over.', 'That is 3 wholes and 2 fifths left.', '17/5 = <b>3 2/5</b>. Type it as <b>3 2/5</b> (a space after the 3).'] },
          { t: 'example', title: 'Mixed number → fraction: 2 3/8', steps: ['Each whole is 8/8. Two wholes = 2 × 8 = 16 eighths.', 'Add the 3 extra eighths: 16 + 3 = 19.', '2 3/8 = <b>19/8</b>.'] },
          { t: 'fill', html: '11/4 = [[2 3/4]]. 1 2/3 = [[5/3]].' }
        ],
        practice: [
          { q: 'Write 9/4 as a mixed number.', answer: '2 1/4', why: '9 ÷ 4 = 2 R 1 → 2 1/4.' },
          { q: 'Write 13/3 as a mixed number.', answer: '4 1/3', why: '13 ÷ 3 = 4 R 1.' },
          { q: 'Write 3 1/2 as a fraction.', answer: '7/2', why: '3 × 2 + 1 = 7 → 7/2.' },
          { q: 'Write 2 4/5 as a fraction.', answer: '14/5', why: '2 × 5 + 4 = 14 → 14/5.' },
          { q: 'Which is greater than 1?', choices: ['8/5', '5/8', '4/4'], answer: 0, why: '8/5 has more parts than one whole.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Mixed Numbers', intro: 'Practice Levels 3 and 4 of Fraction Basics.', href: '../../fluency-lab/fracbasics.html?practice&level=3', btn: 'Open Fraction Basics' },
        exit: [
          { q: 'Write 11/3 as a mixed number.', answer: '3 2/3', why: '11 ÷ 3 = 3 R 2.' },
          { q: 'Write 1 5/6 as a fraction.', answer: '11/6', why: '6 + 5 = 11.' },
          { q: 'How many wholes are in 20/4?', answer: 5, why: '20 ÷ 4 = 5.' }
        ]
      },

      /* ===================== SECTION A: Fractions as Quotients (NF.3) ===================== */
      {
        n: 4, section: 'Section A: Fractions as Quotients', title: 'Equal Shares', when: 'Sep 28',
        goal: 'Let’s share things equally and see that the answer can be a fraction.',
        stds: [NF3],
        targets: ['I can share whole things equally.', 'I can use a fraction to say how much each person gets.'],
        vocab: [['equal share', 'Everyone gets the same amount.'], ['quotient', 'The answer to a division problem.']],
        outline: plan('Notice and Wonder: 3 sandwiches for 4 friends.', '<b>Let’s share sandwiches.</b> Draw how to share them equally.', '<b>Let’s describe each share</b> with a fraction.', 'When is the share less than 1 whole? More than 1 whole?'),
        materials: MAT(['Paper “sandwiches” to cut and share', 'Colored pencils']),
        notes: [
          { t: 'p', html: '<p>If 4 friends share 1 sandwich, each gets ' + F(1, 4) + '. If 4 friends share <b>3</b> sandwiches, each gets ' + F(1, 4) + ' from each sandwich: ' + F(1, 4) + ' + ' + F(1, 4) + ' + ' + F(1, 4) + ' = ' + F(3, 4) + '.</p>' },
          { t: 'fig', html: SHARE(3, 4), caption: '3 sandwiches cut into 4 pieces each. Each person (1, 2, 3, 4) gets 3 pieces, which is 3/4 of a sandwich.' },
          { t: 'key', label: 'Big idea', html: '<p style="margin:0">Sharing <b>a</b> things among <b>b</b> people gives each person ' + F('a', 'b') + '.</p>' },
          { t: 'fill', html: '2 pizzas shared by 3 kids: each gets [[2/3]] of a pizza. 5 pizzas shared by 5 kids: each gets [[1]] pizza.' }
        ],
        practice: [
          { q: '1 granola bar is shared by 3 friends. How much does each get?', answer: '1/3', why: '1 ÷ 3 = 1/3.' },
          { q: '2 sandwiches are shared by 5 friends. How much does each get?', answer: '2/5', why: '2 ÷ 5 = 2/5.' },
          { q: '6 cookies are shared by 3 friends. How many cookies does each get?', answer: 2, why: '6 ÷ 3 = 2.' },
          { q: '3 pizzas shared by 8 kids. Is each share more or less than 1 pizza?', choices: ['Less than 1', 'More than 1', 'Exactly 1'], answer: 0, why: 'There are fewer pizzas than kids.' }
        ],
        lab: { type: 'share', title: 'Sharing Lab', lead: 'Cut and deal the pieces fairly.', intro: 'Choose how many pieces to cut each item into, then deal them out. Each color is one person.', problems: [[3, 4, 'sandwiches'], [2, 3, 'pizzas'], [1, 4, 'brownies'], [4, 5, 'pies']] },
        exit: [
          { q: '3 pies are shared by 5 people. How much pie does each person get?', answer: '3/5', why: '3 ÷ 5 = 3/5.' },
          { q: '1 pan of brownies is shared by 6 friends. How much does each get?', answer: '1/6', why: '1 ÷ 6 = 1/6.' },
          { q: 'Which shows 4 friends sharing 3 waffles?', choices: ['Each gets 3/4 of a waffle', 'Each gets 4/3 of a waffle', 'Each gets 1 waffle'], answer: 0, why: '3 ÷ 4 = 3/4.' }
        ]
      },
      {
        n: 5, section: 'Section A: Fractions as Quotients', title: 'A Fraction Is Division', when: 'Sep 29',
        goal: 'Let’s see that a/b means a ÷ b.',
        stds: [NF3],
        targets: ['I can write a division expression as a fraction.', 'I can write a fraction as a division expression.'],
        vocab: [['quotient', 'The answer to division.'], ['dividend', 'The number being divided.'], ['divisor', 'The number we divide by.']],
        outline: plan('True or False: 3 ÷ 4 = 3/4.', '<b>Let’s connect sharing to division.</b>', '<b>Let’s match</b> division expressions, fractions and stories.', 'Why does the fraction bar mean “divided by”?'),
        materials: MAT(['Matching cards: expression, fraction, story']),
        notes: [
          { t: 'key', label: 'The fraction bar means divide', html: '<p style="margin:0;font:600 20px var(--mono);color:var(--navy)">a ÷ b = ' + F('a', 'b') + '</p><p style="margin:6px 0 0">' + F(5, 8) + ' = 5 ÷ 8 &nbsp; · &nbsp; 7 ÷ 3 = ' + F(7, 3) + ' = 2 1/3</p>' },
          { t: 'example', title: 'Write 9 ÷ 4 as a fraction and a mixed number', steps: ['9 ÷ 4 = <b>9/4</b>.', '9/4 = 8/4 + 1/4 = <b>2 1/4</b>.', 'Check: 4 people sharing 9 cookies each get 2 whole cookies and 1/4 more.'] },
          { t: 'fill', html: '2 ÷ 7 = [[2/7]]. The fraction 5/6 means 5 [[÷|divided by|divide]] 6.' }
        ],
        practice: [
          { q: 'Write 4 ÷ 9 as a fraction.', answer: '4/9', why: 'a ÷ b = a/b.' },
          { q: 'Write 7 ÷ 2 as a mixed number.', answer: '3 1/2', why: '7/2 = 3 1/2.' },
          { q: 'Which division expression equals 3/10?', choices: ['3 ÷ 10', '10 ÷ 3', '3 × 10'], answer: 0, why: 'The numerator is divided by the denominator.' },
          { q: 'What is 12 ÷ 5? Write a mixed number.', answer: '2 2/5', why: '12/5 = 2 2/5.' },
          { q: 'What is 15 ÷ 3?', answer: 5, why: '15/3 = 5.' }
        ],
        lab: { type: 'share', title: 'Sharing Lab', lead: 'Division you can see.', intro: 'Each problem is a division problem: items ÷ people. Share and find the fraction.', problems: [[5, 4, 'cookies'], [2, 6, 'sandwiches'], [7, 3, 'muffins']] },
        exit: [
          { q: 'Write 5 ÷ 6 as a fraction.', answer: '5/6', why: '5 ÷ 6 = 5/6.' },
          { q: 'Write 11 ÷ 4 as a mixed number.', answer: '2 3/4', why: '11/4 = 2 3/4.' },
          { q: 'Which story matches 2 ÷ 3?', choices: ['2 pizzas shared by 3 friends', '3 pizzas shared by 2 friends', '2 friends each get 3 pizzas'], answer: 0, why: '2 things shared among 3 people.' }
        ]
      },
      {
        n: 6, section: 'Section A: Fractions as Quotients', title: 'Sharing Stories and Expressions', when: 'Sep 30',
        goal: 'Let’s write division expressions for sharing stories.',
        stds: [NF3, OA2],
        targets: ['I can write a division expression for a sharing story.', 'I can solve it with a fraction or mixed number.'],
        vocab: [['expression', 'Numbers and operation signs, like 5 ÷ 2.']],
        outline: plan('Estimation: About how much does each person get?', '<b>Let’s write expressions</b> for sharing stories (SAB 473–474 contexts).', '<b>Let’s model with cubes</b> and diagrams.', 'Which number is the dividend? Which is the divisor?'),
        materials: MAT(['Investigations SAB 473–474 (Unit 7, Session 2.1)', 'Cubes in baggies']),
        notes: [
          { t: 'tip', html: '<b>Ask:</b> What is being shared? (dividend) How many groups or people? (divisor)' },
          { t: 'example', title: 'Story → expression', q: '5 friends share 8 feet of ribbon equally. How much ribbon does each get?', steps: ['What is shared? 8 feet of ribbon.', 'How many people? 5.', 'Expression: <b>8 ÷ 5</b>.', '8 ÷ 5 = 8/5 = <b>1 3/5 feet</b> each.'] },
          { t: 'fill', html: '6 cups of juice shared by 4 kids: the expression is 6 ÷ [[4]]. Each kid gets [[1 1/2|1 2/4|6/4|3/2]] cups.' }
        ],
        practice: [
          { q: '3 friends share 5 yards of rope. Which expression shows each share?', choices: ['5 ÷ 3', '3 ÷ 5', '5 × 3'], answer: 0, why: '5 yards shared among 3 friends.' },
          { q: 'How many yards does each friend get? (5 ÷ 3)', answer: '1 2/3', unit: 'yards', why: '5/3 = 1 2/3.' },
          { q: '4 students share 3 liters of water. How many liters does each get?', answer: '3/4', unit: 'liters', why: '3 ÷ 4 = 3/4.' },
          { q: '10 pounds of clay is split into 4 equal pieces. How heavy is each piece?', answer: '2 1/2', unit: 'pounds', hint: '10 ÷ 4 = 10/4.', why: '10/4 = 2 2/4 = 2 1/2.' }
        ],
        lab: { type: 'share', title: 'Sharing Lab', lead: 'Model each story.', intro: 'Share the items. Then write the answer as a fraction or mixed number.', problems: [[5, 3, 'ropes'], [6, 4, 'pizzas'], [3, 8, 'pies']] },
        exit: [
          { q: '6 friends share 4 pizzas. Which expression shows each share?', choices: ['4 ÷ 6', '6 ÷ 4', '6 × 4'], answer: 0, why: '4 pizzas shared by 6.' },
          { q: 'How much pizza does each friend get? Use simplest form.', answer: '2/3', why: '4/6 = 2/3.' },
          { q: '7 meters of fabric are cut into 2 equal pieces. How long is each piece?', answer: '3 1/2', unit: 'meters', why: '7/2 = 3 1/2.' }
        ]
      },
      {
        n: 7, section: 'Section A: Fractions as Quotients', title: 'Quotients Between Whole Numbers', when: 'Oct 1',
        goal: 'Let’s figure out which two whole numbers a quotient is between.',
        stds: [NF3],
        targets: ['I can tell which two whole numbers a fraction quotient is between.', 'I can write the quotient as a mixed number.'],
        vocab: [['between', 'Bigger than one number and smaller than another.']],
        outline: plan('Closest Estimate number talk.', '<b>Let’s estimate quotients.</b> Is 17 ÷ 5 between 2 and 3, or 3 and 4?', '<b>Let’s check</b> by writing a mixed number.', 'How does the remainder become the fraction?'),
        materials: MAT(['Closest Estimate routine (2–3 problems as a number talk)']),
        notes: [
          { t: 'example', title: '17 ÷ 5', steps: ['5 × 3 = 15 and 5 × 4 = 20. 17 is between 15 and 20.', 'So 17 ÷ 5 is between <b>3</b> and <b>4</b>.', '17 ÷ 5 = 3 with 2 left over. The 2 left over is shared by 5: 2/5.', '17 ÷ 5 = <b>3 2/5</b>.'] },
          { t: 'key', label: 'Remainder → fraction', html: '<p style="margin:0">When you divide, the leftover (remainder) is still shared. It becomes the fraction: <b>remainder / divisor</b>.</p>' },
          { t: 'fill', html: '23 ÷ 4 is between 5 and [[6]]. 23 ÷ 4 = [[5 3/4]].' }
        ],
        practice: [
          { q: '14 ÷ 3 is between which two whole numbers?', choices: ['4 and 5', '3 and 4', '5 and 6'], answer: 0, why: '3 × 4 = 12 and 3 × 5 = 15.' },
          { q: 'Write 14 ÷ 3 as a mixed number.', answer: '4 2/3', why: '14 = 12 + 2 → 4 2/3.' },
          { q: 'Write 31 ÷ 6 as a mixed number.', answer: '5 1/6', why: '6 × 5 = 30, 1 left.' },
          { q: 'Which quotient is between 2 and 3?', choices: ['11 ÷ 4', '13 ÷ 4', '7 ÷ 4'], answer: 0, why: '11/4 = 2 3/4.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Division with Remainders', intro: 'Practice finding quotients and remainders. Then turn each remainder into a fraction in your head!', href: '../../fluency-lab/divide.html?practice&level=1', btn: 'Open Division practice' },
        exit: [
          { q: '19 ÷ 4 is between which two whole numbers?', choices: ['4 and 5', '3 and 4', '5 and 6'], answer: 0, why: '4 × 4 = 16 and 4 × 5 = 20.' },
          { q: 'Write 19 ÷ 4 as a mixed number.', answer: '4 3/4', why: '16 + 3 → 4 3/4.' },
          { q: 'Write 25 ÷ 8 as a mixed number.', answer: '3 1/8', why: '24 + 1 → 3 1/8.' }
        ]
      },
      {
        n: 8, section: 'Section A: Fractions as Quotients', title: 'Fraction Quotient Word Problems', when: 'Oct 2',
        goal: 'Let’s solve word problems where the answer is a fraction or mixed number.',
        stds: [NF3],
        targets: ['I can solve division word problems with fraction answers.', 'I can tell if my answer makes sense.'],
        vocab: [['reasonable', 'An answer that makes sense.']],
        outline: plan('Estimate: 25 pounds of rice into 6 bags.', '<b>Let’s solve sharing problems</b> with models (cubes, drawings).', '<b>Let’s check if answers make sense.</b>', 'When should the answer be a fraction instead of a remainder?'),
        materials: MAT(['Cubes in baggies (Lesson 5, Activity 1 edited version)', 'Edited slide deck']),
        notes: [
          { t: 'example', title: 'Is the answer reasonable?', q: '6 hikers share 20 ounces of trail mix. How much does each get?', steps: ['20 ÷ 6 = 20/6 = 3 2/6 = <b>3 1/3 ounces</b>.', 'Check: 6 × 3 = 18, and 6 × 4 = 24. 20 is between, so the answer is between 3 and 4. ✓'] },
          { t: 'tip', html: '<b>Fraction or remainder?</b> If the leftover can be cut (ribbon, pizza, trail mix), use a fraction. If it can’t (people, cars), think about what the remainder means.' }
        ],
        practice: [
          { q: '4 runners share 9 miles of a relay equally. How far does each run?', answer: '2 1/4', unit: 'miles', why: '9/4 = 2 1/4.' },
          { q: '3 classes share 10 pounds of clay equally. How much does each class get?', answer: '3 1/3', unit: 'pounds', why: '10/3 = 3 1/3.' },
          { q: '8 friends share 5 pizzas. How much pizza does each friend get?', answer: '5/8', why: '5 ÷ 8 = 5/8.' },
          { q: 'A 15-foot board is cut into 4 equal pieces. Which answer is reasonable?', choices: ['3 3/4 feet', '11 feet', '1/4 foot'], answer: 0, why: '15/4 = 3 3/4, between 3 and 4.' }
        ],
        lab: { type: 'share', title: 'Sharing Lab', lead: 'More sharing problems.', intro: 'Model each problem.', problems: [[9, 4, 'miles'], [5, 8, 'pizzas'], [10, 3, 'pounds']] },
        exit: [
          { q: '5 friends share 12 cups of popcorn. How many cups does each get?', answer: '2 2/5', unit: 'cups', why: '12/5 = 2 2/5.' },
          { q: '6 kids share 4 sandwiches. How much does each kid get? Simplest form.', answer: '2/3', why: '4/6 = 2/3.' },
          { q: 'Is 2 2/5 between 2 and 3?', choices: ['Yes', 'No'], answer: 0, why: '2 2/5 is more than 2 and less than 3.' }
        ]
      },

      /* ===================== SECTION B: Fractions of Whole Numbers (NF.4) ===================== */
      {
        n: 9, section: 'Section B: Fractions of Whole Numbers', title: 'A Fraction of a Whole Number', when: 'Oct 5',
        goal: 'Let’s find a fraction of a whole number.',
        stds: [NF4],
        targets: ['I can find a unit fraction of a whole number, like 1/3 of 12.', 'I can find a fraction like 2/3 of 12.'],
        vocab: [['of', 'In math, “of” often means multiply.'], ['tape diagram', 'A bar split into equal parts to show a problem.']],
        outline: plan('Number Talk: 1/2 of 10, 1/2 of 14, 1/4 of 20.', '<b>Let’s use tape diagrams</b> to find 1/3 of 12.', '<b>Let’s find 2/3 of 12.</b>', 'How is 2/3 of 12 related to 1/3 of 12?'),
        materials: MAT(['Tape diagram templates']),
        notes: [
          { t: 'example', title: '2/3 of 12', fig: { strip: { parts: 3, shaded: 2 } }, steps: ['Split 12 into 3 equal parts: 12 ÷ 3 = 4. So 1/3 of 12 = 4.', '2/3 is 2 of those parts: 2 × 4 = <b>8</b>.', 'So 2/3 of 12 = 8, which is the same as 2/3 × 12.'] },
          { t: 'key', label: 'Fraction of a number', html: '<p style="margin:0">Divide by the <b>denominator</b>. Multiply by the <b>numerator</b>.</p>' },
          { t: 'fill', html: '1/4 of 20 = [[5]]. 3/4 of 20 = [[15]].' }
        ],
        practice: [
          { q: 'What is 1/5 of 30?', answer: 6, why: '30 ÷ 5 = 6.' },
          { q: 'What is 3/5 of 30?', answer: 18, why: '6 × 3 = 18.' },
          { q: 'What is 2/3 of 18?', answer: 12, why: '18 ÷ 3 = 6, 6 × 2 = 12.' },
          { q: 'A class has 24 students. 3/8 of them ride the bus. How many ride the bus?', answer: 9, unit: 'students', why: '24 ÷ 8 = 3, 3 × 3 = 9.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Multiply Fractions', intro: 'Practice Level 3 of Fraction Operations (whole number × fraction problems).', href: '../../fluency-lab/fracops.html?practice&level=3', btn: 'Open Fraction Operations' },
        exit: [
          { q: 'What is 1/6 of 24?', answer: 4, why: '24 ÷ 6 = 4.' },
          { q: 'What is 5/6 of 24?', answer: 20, why: '4 × 5 = 20.' },
          { q: 'There are 40 marbles. 3/4 are blue. How many are blue?', answer: 30, why: '40 ÷ 4 = 10, 10 × 3 = 30.' }
        ]
      },
      {
        n: 10, section: 'Section B: Fractions of Whole Numbers', title: 'Whole Number Times a Fraction', when: 'Oct 6',
        goal: 'Let’s multiply a whole number and a fraction.',
        stds: [NF4],
        targets: ['I can multiply a whole number by a fraction.', 'I can explain why 3 × 2/5 = 6/5.'],
        vocab: [['factor', 'A number we multiply.'], ['product', 'The answer to multiplication.']],
        outline: plan('How many fifths? 2/5 + 2/5 + 2/5.', '<b>Let’s see 3 × 2/5</b> as 3 groups of 2/5.', '<b>Let’s see 2/5 × 3</b> as 2/5 of 3.', 'Why do 3 × 2/5 and 2/5 × 3 have the same product?'),
        materials: MAT(['Fraction strips']),
        notes: [
          { t: 'example', title: '3 × 2/5', fig: { strip: { parts: 5, shaded: 6, wholes: 2 } }, steps: ['3 groups of 2/5: 2/5 + 2/5 + 2/5.', 'That is 6 fifths: 6/5.', '6/5 = <b>1 1/5</b>.'] },
          { t: 'key', label: 'Whole number × fraction', html: '<p style="margin:0">Multiply the whole number by the <b>numerator</b>. Keep the denominator. ' + F('3 × 2', 5) + ' = ' + F(6, 5) + '</p>' },
          { t: 'fill', html: '4 × 2/3 = [[8/3|2 2/3]]. 2/3 × 4 has the [[same]] product.' }
        ],
        practice: [
          { q: '5 × 1/4 = ?', answer: '5/4', why: '5 fourths = 5/4 = 1 1/4.' },
          { q: '3 × 3/8 = ?', answer: '9/8', why: '9 eighths = 1 1/8.' },
          { q: '2/3 × 6 = ?', answer: 4, why: '2/3 of 6 = 4.' },
          { q: 'Each lap is 3/4 mile. Kai runs 6 laps. How far does he run?', answer: '4 1/2', unit: 'miles', why: '6 × 3/4 = 18/4 = 4 2/4 = 4 1/2.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Multiply Fractions', intro: 'Practice Level 3 of Fraction Operations.', href: '../../fluency-lab/fracops.html?practice&level=3', btn: 'Open Fraction Operations' },
        exit: [
          { q: '4 × 2/5 = ?', answer: '8/5', why: '8 fifths = 1 3/5.' },
          { q: '3/4 × 8 = ?', answer: 6, why: '3/4 of 8 = 6.' },
          { q: 'A recipe uses 2/3 cup of oats. Make it 3 times. How many cups?', answer: 2, unit: 'cups', why: '3 × 2/3 = 6/3 = 2.' }
        ]
      },
      {
        n: 11, section: 'Section B: Fractions of Whole Numbers', title: 'Fraction Multiplication Stories', when: 'Oct 7',
        goal: 'Let’s solve story problems with fractions of whole numbers.',
        stds: [NF4],
        targets: ['I can tell when a story is about a fraction of an amount.', 'I can solve it and explain my thinking.'],
        vocab: [['tape diagram', 'A bar model that shows parts of a total.']],
        outline: plan('Which One Doesn’t Belong: four stories.', '<b>Let’s draw tape diagrams</b> for fraction stories.', '<b>Let’s write equations</b> and solve.', 'How do you know a story is “a fraction of” something?'),
        materials: MAT(['Lesson 8 video for teachers (Activity 2)']),
        notes: [
          { t: 'example', title: 'Story', q: 'Lin has 15 stickers. She gives 2/5 of them to her brother. How many does she give?', steps: ['The whole is 15. Split it into 5 equal parts: 15 ÷ 5 = 3.', '2 parts: 2 × 3 = 6.', 'Equation: 2/5 × 15 = <b>6 stickers</b>.'] },
          { t: 'tip', html: '<b>Is the answer reasonable?</b> 2/5 is less than 1/2, so the answer should be less than half of 15.' }
        ],
        practice: [
          { q: 'A 12-mile trail. Ana hikes 3/4 of it. How many miles?', answer: 9, unit: 'miles', why: '12 ÷ 4 = 3, × 3 = 9.' },
          { q: 'There are 28 kids. 1/4 are in band. How many are in band?', answer: 7, why: '28 ÷ 4 = 7.' },
          { q: 'A movie is 90 minutes. You watched 2/3 of it. How many minutes?', answer: 60, unit: 'minutes', why: '90 ÷ 3 = 30, × 2 = 60.' },
          { q: 'Which equation matches: “3/8 of 32 apples are green”?', choices: ['3/8 × 32', '32 ÷ 3/8', '3/8 + 32'], answer: 0, why: '“Of” means multiply.' }
        ],
        exit: [
          { q: 'A bag has 20 marbles. 3/5 are red. How many are red?', answer: 12, why: '20 ÷ 5 = 4, × 3 = 12.' },
          { q: 'A ribbon is 18 inches. Max uses 5/6 of it. How many inches?', answer: 15, unit: 'inches', why: '18 ÷ 6 = 3, × 5 = 15.' },
          { q: '3/4 × 16 = ?', answer: 12, why: '16 ÷ 4 = 4, × 3 = 12.' }
        ]
      },
      {
        n: 12, section: 'Section B: Fractions of Whole Numbers', title: 'Bonus: Fractions of a Set', when: 'Oct 8',
        goal: 'Let’s find fractions of a group of objects.',
        stds: [NF4],
        targets: ['I can find a fraction of a set of objects.', 'I can name what fraction of a set has a feature.'],
        vocab: [['set', 'A group of objects.']],
        outline: plan('Look at 12 counters: 4 red, 8 yellow. What fraction is red?', '<b>Let’s find fractions of a set</b> (Fraction of a Set practice).', '<b>Bicycle Race</b> task (C3-4, Unit 7 1.2).', 'How is a fraction of a set like a fraction of a whole number?'),
        materials: ['Fractions of a set resources', 'Fraction of a Set practice worksheet', 'Bicycle Race task', 'Two-color counters'],
        notes: [
          { t: 'p', html: '<p>A <b>set</b> is a group of objects. The <b>whole</b> is the whole group. If 4 of 12 counters are red, then ' + F(4, 12) + ' = ' + F(1, 3) + ' of the set is red.</p>' },
          { t: 'example', title: '3/4 of a set of 16', steps: ['Split 16 objects into 4 equal groups: 4 in each group.', 'Take 3 groups: 3 × 4 = <b>12</b> objects.'] }
        ],
        practice: [
          { q: 'There are 10 balls. 3 are soccer balls. What fraction are soccer balls?', answer: '3/10', why: '3 out of 10.' },
          { q: '6 of 18 students wear glasses. What fraction wear glasses? Simplest form.', answer: '1/3', why: '6/18 = 1/3.' },
          { q: 'What is 2/5 of a set of 25 coins?', answer: 10, why: '25 ÷ 5 = 5, × 2 = 10.' },
          { q: 'In a race of 24 bikes, 5/8 are red. How many are red?', answer: 15, why: '24 ÷ 8 = 3, × 5 = 15.' }
        ],
        exit: [
          { q: '8 of 12 eggs are brown. What fraction are brown? Simplest form.', answer: '2/3', why: '8/12 = 2/3.' },
          { q: 'What is 3/7 of 21?', answer: 9, why: '21 ÷ 7 = 3, × 3 = 9.' }
        ]
      },
      {
        n: 13, section: 'Section B: Fractions of Whole Numbers', title: 'Bonus: Fractions as Division Word Problems', when: 'Oct 9',
        goal: 'Let’s create representations, stories and equations for fractions as division.',
        stds: [NF3],
        targets: ['I can match a story, a picture and an equation.', 'I can write my own fraction-as-division story.'],
        vocab: [['representation', 'A way to show math: picture, equation or words.']],
        outline: plan('Which story matches 3 ÷ 5?', '<b>Fractions as Division word problem practice.</b>', '<b>Creating representations, word problems and equations.</b>', 'How do the picture, the story and the equation connect?'),
        materials: ['Fractions as Division word problem practice', 'Fractions as Division (creating representations, word problems, and equations)'],
        notes: [
          { t: 'key', label: 'Three ways to show 7 ÷ 2', html: '<ul style="margin:0"><li><b>Story:</b> 2 kids share 7 cups of lemonade.</li><li><b>Equation:</b> 7 ÷ 2 = 7/2 = 3 1/2</li><li><b>Picture:</b> 7 cups, each cut in half, dealt to 2 kids.</li></ul>' },
          { t: 'write', q: 'Write your own story for 5 ÷ 4. Then solve it.', ph: '4 friends share 5 …' }
        ],
        practice: [
          { q: 'Which equation matches: “3 kids share 2 liters of water equally”?', choices: ['2 ÷ 3 = 2/3', '3 ÷ 2 = 1 1/2', '3 × 2 = 6'], answer: 0, why: '2 liters shared by 3 kids.' },
          { q: '7 cups of trail mix are put in 4 bags equally. How many cups in each bag?', answer: '1 3/4', unit: 'cups', why: '7/4 = 1 3/4.' },
          { q: 'A 5-foot rope is cut into 6 equal pieces. How long is each piece?', answer: '5/6', unit: 'foot', why: '5 ÷ 6 = 5/6.' }
        ],
        lab: { type: 'share', title: 'Sharing Lab', intro: 'Model each division story.', problems: [[7, 2, 'cups'], [5, 6, 'ropes'], [7, 4, 'cups']] },
        exit: [
          { q: '9 pounds of apples go into 2 bags equally. How many pounds per bag?', answer: '4 1/2', unit: 'pounds', why: '9/2 = 4 1/2.' },
          { q: 'Which story matches 4 ÷ 5?', choices: ['5 friends share 4 waffles', '4 friends share 5 waffles'], answer: 0, why: '4 things shared among 5.' }
        ]
      },

      /* ===================== SECTION C: Fraction × Fraction and Area (NF.4) ===================== */
      {
        n: 14, section: 'Section C: Fraction Multiplication and Area', title: 'A Fraction of a Fraction', when: 'Oct 12',
        goal: 'Let’s find a fraction of a fraction.',
        stds: [NF4],
        targets: ['I can find a fraction of a fraction, like 1/2 of 1/3.', 'I can use a diagram to show it.'],
        vocab: [['unit fraction', 'A fraction with 1 on top.']],
        outline: plan('Number Talk: 1/2 of 1/2. 1/2 of 1/4.', '<b>Let’s fold paper</b> to find half of a third.', '<b>Let’s draw diagrams</b> for a fraction of a fraction.', 'Why is 1/2 of 1/3 smaller than 1/3?'),
        materials: MAT(['Paper strips for folding', 'Colored pencils']),
        notes: [
          { t: 'example', title: '1/2 of 1/3', fig: area(1, 3, 1, 2), steps: ['Shade 1/3 of the square (yellow column).', 'Take 1/2 of that (green).', 'The whole square has 6 equal parts. Green is 1 part.', '1/2 of 1/3 = <b>1/6</b>.'] },
          { t: 'key', label: 'Remember', html: '<p style="margin:0">Taking a fraction (less than 1) of something makes it <b>smaller</b>. 1/2 × 1/3 = 1/6.</p>' },
          { t: 'fill', html: '1/2 of 1/4 = [[1/8]]. 1/3 of 1/2 = [[1/6]].' }
        ],
        practice: [
          { q: 'What is 1/2 of 1/5?', answer: '1/10', why: '1/2 × 1/5 = 1/10.' },
          { q: 'What is 1/3 of 1/4?', fig: area(1, 4, 1, 3), answer: '1/12', why: '1 green part out of 12.' },
          { q: 'What is 1/4 of 1/2?', answer: '1/8', why: '1/4 × 1/2 = 1/8.' },
          { q: 'Is 1/2 of 1/6 bigger or smaller than 1/6?', choices: ['Smaller', 'Bigger', 'The same'], answer: 0, why: 'Half of something is smaller than the whole thing.' }
        ],
        lab: { type: 'area', title: 'Area Model Lab', lead: 'See a fraction of a fraction.', intro: 'Shade the first fraction. Then shade the second fraction of it. Green is the product.', problems: [[1, 3, 1, 2], [1, 4, 1, 3], [1, 2, 1, 5]] },
        exit: [
          { q: 'What is 1/2 of 1/8?', answer: '1/16', why: '1/2 × 1/8 = 1/16.' },
          { q: 'What is 1/3 of 1/3?', answer: '1/9', why: '1/3 × 1/3 = 1/9.' }
        ]
      },
      {
        n: 15, section: 'Section C: Fraction Multiplication and Area', title: 'Multiply Fractions with an Area Model', when: 'Oct 13',
        goal: 'Let’s use area models to multiply any two fractions.',
        stds: [NF4],
        targets: ['I can use an area model to multiply two fractions.', 'I can explain what the overlap means.'],
        vocab: [['area model', 'A rectangle split into parts to show multiplication.']],
        outline: plan('What fraction of the square is shaded?', '<b>Let’s shade area models</b> for 2/3 × 3/4.', '<b>Let’s write the product</b> from the model.', 'How do the rows and columns tell us the denominator?'),
        materials: MAT(['Grid paper', 'Two colored pencils']),
        notes: [
          { t: 'example', title: '2/3 × 3/4', fig: area(2, 3, 3, 4), steps: ['Split the square into 3 columns. Shade 2 (yellow) for 2/3.', 'Split it into 4 rows. Shade 3 (blue) for 3/4.', 'The overlap (green) has 2 × 3 = 6 parts.', 'The whole has 3 × 4 = 12 parts. 2/3 × 3/4 = <b>6/12 = 1/2</b>.'] },
          { t: 'key', label: 'The model shows', html: '<p style="margin:0">Columns × rows = parts in the <b>whole</b> (denominator). Green parts = <b>numerator</b>.</p>' }
        ],
        practice: [
          { q: 'What is 2/3 × 1/2?', fig: area(2, 3, 1, 2), answer: '2/6', why: '2 green parts of 6 = 2/6 = 1/3.' },
          { q: 'What is 3/4 × 1/3?', fig: area(3, 4, 1, 3), answer: '3/12', why: '3 of 12 = 1/4.' },
          { q: 'What is 2/5 × 2/3?', fig: area(2, 5, 2, 3), answer: '4/15', why: '4 green parts of 15.' },
          { q: 'In an area model for 3/5 × 2/3, how many parts are in the whole square?', answer: 15, why: '5 columns × 3 rows = 15.' }
        ],
        lab: { type: 'area', title: 'Area Model Lab', lead: 'Build the model, then find the product.', intro: 'Shade both fractions. The green overlap is the product.', problems: [[2, 3, 3, 4], [3, 5, 1, 2], [2, 4, 2, 3], [3, 4, 2, 5]] },
        exit: [
          { q: 'What is 3/4 × 2/3?', fig: area(3, 4, 2, 3), answer: '6/12', why: '6 green of 12 = 1/2.' },
          { q: 'What is 1/2 × 4/5?', answer: '4/10', why: '4/10 = 2/5.' }
        ]
      },
      {
        n: 16, section: 'Section C: Fraction Multiplication and Area', title: 'Multiply Numerators, Multiply Denominators', when: 'Oct 14–15',
        goal: 'Let’s find a shortcut for multiplying fractions.',
        stds: [NF4],
        targets: ['I can multiply fractions by multiplying the numerators and the denominators.', 'I can explain why the shortcut works using an area model.'],
        vocab: [['numerator', 'Top number.'], ['denominator', 'Bottom number.']],
        outline: plan('Look at 4 area models. What pattern do you see?', '<b>Let’s find the pattern:</b> green parts = top × top; all parts = bottom × bottom.', '<b>Let’s practice</b> the shortcut and simplify.', 'Why does the shortcut work?'),
        materials: MAT(),
        notes: [
          { t: 'key', label: 'Multiply fractions', html: '<p style="margin:0;font:600 20px var(--mono);color:var(--navy)">' + F('a', 'b') + ' × ' + F('c', 'd') + ' = ' + F('a × c', 'b × d') + '</p>' },
          { t: 'example', title: '3/5 × 2/3', steps: ['Tops: 3 × 2 = 6.', 'Bottoms: 5 × 3 = 15.', '6/15. Simplify: divide by 3 → <b>2/5</b>.'] },
          { t: 'fill', html: '2/3 × 4/5 = [[8/15]]. 1/4 × 2/3 = [[2/12|1/6]].' }
        ],
        practice: [
          { q: '3/4 × 1/2 = ?', answer: '3/8', why: '3 × 1 = 3, 4 × 2 = 8.' },
          { q: '2/5 × 3/4 = ?', answer: '6/20', why: '6/20 = 3/10.' },
          { q: '5/6 × 2/3 = ?', answer: '10/18', why: '10/18 = 5/9.' },
          { q: '4/5 × 5/8 = ?', answer: '20/40', why: '20/40 = 1/2.' },
          { q: 'Is 3/4 × 2/3 more or less than 3/4?', choices: ['Less', 'More', 'Equal'], answer: 0, why: 'Multiplying by a fraction less than 1 makes it smaller.' }
        ],
        lab: { type: 'link', title: 'Fluency Lab: Multiply Fractions', intro: 'Practice Level 3 of Fraction Operations until you get 9 or 10 right.', href: '../../fluency-lab/fracops.html?practice&level=3', btn: 'Open Fraction Operations' },
        exit: [
          { q: '2/3 × 5/7 = ?', answer: '10/21', why: '2 × 5 = 10, 3 × 7 = 21.' },
          { q: '3/8 × 2/3 = ? Simplest form.', answer: '1/4', why: '6/24 = 1/4.' },
          { q: 'Which is the product of 1/2 and 6/7?', choices: ['3/7', '7/9', '6/14 only'], answer: 0, why: '6/14 = 3/7.' }
        ]
      },
      {
        n: 17, section: 'Section C: Fraction Multiplication and Area', title: 'Area of Rectangles with Fraction Sides', when: 'Oct 16',
        goal: 'Let’s find the area of rectangles with fractional side lengths.',
        stds: [NF4],
        targets: ['I can find the area of a rectangle with fraction side lengths.', 'I can label area in square units.'],
        vocab: [['area', 'The number of square units that cover a flat shape.'], ['square unit', 'A square 1 unit on each side.']],
        outline: plan('A rectangle 1/2 foot by 1/3 foot. Estimate its area.', '<b>Let’s tile rectangles</b> with fraction sides.', '<b>Let’s use multiplication</b>: area = length × width.', 'How is area of a rectangle like fraction multiplication?'),
        materials: MAT(['Grid paper', 'Rulers']),
        notes: [
          { t: 'example', title: 'A 3/4 ft by 2/3 ft rectangle', fig: { area: { a: 3, b: 4, c: 2, d: 3, wLabel: '1 ft', hLabel: '1 ft' }, caption: 'The green rectangle is 3/4 ft by 2/3 ft inside a 1 ft square.' }, steps: ['Area = length × width = 3/4 × 2/3.', '= 6/12 = <b>1/2 square foot</b>.'] },
          { t: 'key', label: 'Area', html: '<p style="margin:0">Area = length × width — even when the sides are fractions. Label the answer in <b>square</b> units.</p>' }
        ],
        practice: [
          { q: 'A rectangle is 1/2 m by 3/4 m. What is its area?', answer: '3/8', unit: 'square m', why: '1/2 × 3/4 = 3/8.' },
          { q: 'A rectangle is 2/3 ft by 3/5 ft. What is its area?', answer: '6/15', unit: 'square ft', why: '6/15 = 2/5.' },
          { q: 'A garden is 4 yd by 2/3 yd. What is its area?', answer: '8/3', unit: 'square yd', why: '4 × 2/3 = 8/3 = 2 2/3.' },
          { q: 'Which unit is used for area?', choices: ['Square feet', 'Feet', 'Cubic feet'], answer: 0, why: 'Area covers a flat space, so square units.' }
        ],
        lab: { type: 'area', title: 'Area Model Lab', intro: 'Each model is a rectangle inside a 1-by-1 square. Find the area of the green rectangle.', problems: [[1, 2, 3, 4], [2, 3, 3, 5], [3, 4, 1, 3]] },
        exit: [
          { q: 'A rectangle is 3/4 in by 1/2 in. What is its area?', answer: '3/8', unit: 'square in', why: '3/4 × 1/2 = 3/8.' },
          { q: 'A rectangle is 5 cm by 3/10 cm. What is its area?', answer: '15/10', unit: 'square cm', why: '15/10 = 1 1/2.' }
        ]
      },
      {
        n: 18, section: 'Section C: Fraction Multiplication and Area', title: 'Area with Mixed Number Sides', when: 'Oct 19',
        goal: 'Let’s find areas when a side is a mixed number by splitting the rectangle.',
        stds: [NF4],
        targets: ['I can split a rectangle into parts to find the area.', 'I can multiply a whole number by a mixed number.'],
        vocab: [['partial products', 'Smaller products you add to get the whole product.']],
        outline: plan('Number Talk: 4 × 2 1/2.', '<b>Let’s split rectangles</b> into a whole-number part and a fraction part (BCS Lesson 14 with IM).', '<b>Let’s add the partial areas.</b>', 'Why does splitting the rectangle work?'),
        materials: MAT(['BCS U2 Lesson 14 handout (use with the IM lesson)', 'Grid paper']),
        notes: [
          { t: 'example', title: '3 × 2 1/2', steps: ['Split 2 1/2 into 2 and 1/2.', '3 × 2 = 6.', '3 × 1/2 = 3/2 = 1 1/2.', 'Add: 6 + 1 1/2 = <b>7 1/2</b>.'] },
          { t: 'tip', html: 'This is the same as the <b>partial products</b> you use for 3 × 24 = 3 × 20 + 3 × 4.' }
        ],
        practice: [
          { q: '4 × 1 1/2 = ?', answer: 6, why: '4 + 2 = 6.' },
          { q: 'A rectangle is 5 ft by 2 1/4 ft. Area?', answer: '11 1/4', unit: 'square ft', why: '10 + 5/4 = 11 1/4.' },
          { q: '2 × 3 2/3 = ?', answer: '7 1/3', why: '6 + 4/3 = 7 1/3.' },
          { q: 'A board is 1 1/2 m long and 3 m wide. Area?', answer: '4 1/2', unit: 'square m', why: '3 + 3/2 = 4 1/2.' }
        ],
        exit: [
          { q: '6 × 2 1/3 = ?', answer: 14, why: '12 + 2 = 14.' },
          { q: 'A rug is 3 yd by 1 2/3 yd. Area?', answer: 5, unit: 'square yd', why: '3 + 2 = 5.' }
        ]
      },
      {
        n: 19, section: 'Section C: Fraction Multiplication and Area', title: 'Fraction Multiplication in the World', when: 'Oct 20–21',
        goal: 'Let’s solve real problems with fraction multiplication.',
        stds: [NF4, NF3],
        targets: ['I can choose fraction multiplication or division to solve a problem.', 'I can check if my answer is reasonable.'],
        vocab: [['scaling', 'Making something bigger or smaller by multiplying.']],
        outline: plan('Estimate: Is 3/4 × 12 more or less than 12?', '<b>Let’s solve story problems</b> (multiply or divide?).', '<b>Unit 2 Practice and Review problems</b> (mixed practice).', 'How do you choose the operation?'),
        materials: MAT(['Unit 2 Practice and Review problems']),
        notes: [
          { t: 'key', label: 'Multiply or divide?', html: '<ul style="margin:0"><li><b>“a fraction of”</b> an amount → multiply</li><li><b>sharing</b> equally among people → divide (a fraction is division)</li></ul>' },
          { t: 'tip', html: '<b>Size check:</b> multiplying by a fraction less than 1 gives a smaller answer. 2/3 × 9 = 6, and 6 < 9.' }
        ],
        practice: [
          { q: 'A recipe uses 3/4 cup of milk. You make 1/2 of the recipe. How much milk?', answer: '3/8', unit: 'cup', why: '1/2 × 3/4 = 3/8.' },
          { q: '5 friends share 3 pizzas. How much does each get?', answer: '3/5', why: '3 ÷ 5 = 3/5.' },
          { q: 'A field is 2/3 mile long and 1/2 mile wide. What is its area?', answer: '2/6', unit: 'square mile', why: '2/6 = 1/3.' },
          { q: 'Without solving, is 4/5 × 20 more or less than 20?', choices: ['Less', 'More'], answer: 0, why: '4/5 is less than 1.' }
        ],
        exit: [
          { q: 'Sam has 24 cards. He gives away 3/8 of them. How many does he give away?', answer: 9, why: '24 ÷ 8 = 3, × 3 = 9.' },
          { q: '4 kids share 7 granola bars. How much does each get?', answer: '1 3/4', why: '7/4 = 1 3/4.' },
          { q: '2/3 × 3/8 = ? Simplest form.', answer: '1/4', why: '6/24 = 1/4.' }
        ]
      },
      {
        n: 20, section: 'Unit Review and Test', title: 'Unit 2 Review', when: 'Oct 22–23',
        goal: 'Let’s review the whole unit and get ready for the test.',
        stds: [NF3, NF4],
        targets: ['I can show what I know about fractions as division and fraction multiplication.'],
        vocab: [['simplest form', 'Answer choices on the test are in simplest form — simplify!']],
        outline: [o('Review', 25, 'Unit 2 Practice and Review problems; 5.NF.3 Common Assessment question 5.'), o('Practice', 15, 'Practice and exit ticket on this page.'), o('Unit test', 0, 'SchoolNet Unit 2 assessment. Simplify your answers.')],
        materials: ['Unit 2 Practice and Review problems', '5.NF.3 C3 Common Assessment (question 5)'],
        notes: [
          { t: 'key', label: 'Unit 2 big ideas', html: '<ol style="margin:0"><li>' + F('a', 'b') + ' = a ÷ b. Sharing a things among b people gives each a/b.</li><li>A fraction of a number: divide by the denominator, multiply by the numerator.</li><li>' + F('a', 'b') + ' × ' + F('c', 'd') + ' = ' + F('a × c', 'b × d') + '. Area models show why.</li><li>Area of a rectangle = length × width, even with fractions.</li></ol>' },
          { t: 'tip', html: '<b>Test tip:</b> The answer choices are in <b>simplest form</b>. Simplify before you choose!' }
        ],
        practice: [
          { q: 'Write 5 ÷ 8 as a fraction.', answer: '5/8', why: 'a ÷ b = a/b.' },
          { q: '3 friends share 8 cookies. How many does each get?', answer: '2 2/3', why: '8/3 = 2 2/3.' },
          { q: 'What is 3/4 of 28?', answer: 21, why: '28 ÷ 4 = 7, × 3 = 21.' },
          { q: '5 × 2/3 = ?', answer: '3 1/3', why: '10/3 = 3 1/3.' },
          { q: '4/5 × 1/2 = ? Simplest form.', answer: '2/5', why: '4/10 = 2/5.' },
          { q: 'A rectangle is 3/4 ft by 4/5 ft. What is its area? Simplest form.', answer: '3/5', unit: 'square ft', why: '12/20 = 3/5.' }
        ],
        exit: [
          { q: '7 ÷ 3 = ? (mixed number)', answer: '2 1/3', why: '7/3 = 2 1/3.' },
          { q: '2/3 of 15 = ?', answer: 10, why: '15 ÷ 3 = 5, × 2 = 10.' },
          { q: '3/5 × 5/6 = ? Simplest form.', answer: '1/2', why: '15/30 = 1/2.' },
          { q: 'Which story matches 3 ÷ 4?', choices: ['4 friends share 3 pancakes', '3 friends share 4 pancakes'], answer: 0, why: '3 things shared among 4.' },
          { q: 'A rectangle is 6 m by 1 1/2 m. What is its area?', answer: 9, unit: 'square m', why: '6 + 3 = 9.' }
        ]
      }
    ]
  });

  // small drawings used in the notes
  function FIG2() {
    var row = function (parts, y) { var s = ''; for (var i = 0; i < parts; i++) s += '<rect x="' + (2 + i * 300 / parts) + '" y="' + y + '" width="' + (300 / parts) + '" height="30" fill="' + (i < parts / 2 ? '#FFC107' : '#fff') + '" stroke="#1E2D4F" stroke-width="2"/>'; return s; };
    return '<svg viewBox="0 0 304 110" width="304" role="img" aria-label="Strips showing one half, two fourths and four eighths are equal">' + row(2, 2) + row(4, 40) + row(8, 78) + '</svg>';
  }
  function SHARE(n, people) {
    var C = ['#F2A93B', '#7BA7E0', '#5BB381', '#E07B7B'], s = '';
    for (var k = 0; k < n; k++) for (var i = 0; i < people; i++) s += '<rect x="' + (2 + i * 75) + '" y="' + (2 + k * 44) + '" width="75" height="38" fill="' + C[i % 4] + '" stroke="#1E2D4F" stroke-width="2"/><text x="' + (40 + i * 75) + '" y="' + (27 + k * 44) + '" text-anchor="middle" font-size="14" font-weight="700" font-family="Inter,sans-serif">' + (i + 1) + '</text>';
    return '<svg viewBox="0 0 304 ' + (n * 44) + '" width="304" role="img" aria-label="' + n + ' sandwiches each cut into ' + people + ' pieces">' + s + '</svg>';
  }
})();
