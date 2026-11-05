/* Math · Unit 8: Putting It All Together & EOG Review — 7 pages (all NBT, NF, MD, OA, G standards), May 8 – June 8.
   BCS map: pair with traditional EOG review; be mindful of mixed number × mixed number; skip Section D.
   EOG typing: only digits, decimal point and / are allowed; type mixed numbers like 2 1/3. */
(function () {
  var S = function (c, t) { return [c, t]; };
  var o = function (p, m, t) { return [p, m, t]; };
  var REV = function (focus) { return [o('Warm-up', 10, 'Number talk or Closest Estimate.'), o('Review', 30, focus), o('Exit ticket', 10, 'Mixed EOG-style questions.')]; };
  var EOG = { t: 'tip', html: '<b>EOG typing:</b> type only digits, a decimal point and /. No commas, no units. Mixed numbers: a space after the whole number, like <b>2 1/3</b>.' };
  var ch = function (q, c, a, why) { return { q: q, choices: c, answer: a, why: why }; };

  LessonKit.unit({
    id: 'math-u8', subject: 'math', short: 'Unit 8', title: 'Putting It All Together and EOG Review', home: '../index.html', unitHref: '../unit8.html',
    lessons: [
      { n: 1, title: 'Fractions Review', when: 'May 8–12',
        goal: 'Let’s review adding, subtracting, multiplying and dividing fractions.', stds: [S('NC.5.NF.1', 'Add and subtract fractions and mixed numbers.'), S('NC.5.NF.3', 'Fractions as division.'), S('NC.5.NF.4', 'Multiply fractions and mixed numbers.'), S('NC.5.NF.7', 'Divide with unit fractions.')],
        targets: ['I can solve fraction problems with all four operations.'], vocab: [['simplest form', 'Simplify your answers.']],
        outline: REV('IM Unit 8 Section A (fractions) + EOG review items from the unpacking document.'), materials: ['IM Unit 8 Section A', 'Sample questions from the unpacking document', 'End of Year Review materials'],
        notes: [{ t: 'key', label: 'Fraction toolbox', html: '<ul style="margin:0"><li>+ − : common denominator first</li><li>× : tops × tops, bottoms × bottoms</li><li>a ÷ 1/b = a × b; 1/b ÷ n = 1/(b × n)</li><li>a/b = a ÷ b</li></ul>' }, EOG],
        practice: [{ q: '2/3 + 3/4 = ?', answer: '1 5/12', why: '8/12 + 9/12 = 17/12.' }, { q: '4 1/2 − 2 3/4 = ?', answer: '1 3/4', why: '4 2/4 − 2 3/4 = 3 6/4 − 2 3/4.' }, { q: '3/5 × 15 = ?', answer: 9, why: '45/5.' }, { q: '2 1/2 × 1 1/3 = ?', answer: '3 1/3', why: '5/2 × 4/3 = 20/6.' }, { q: '5 ÷ 1/4 = ?', answer: 20, why: '5 × 4.' }, { q: '7 friends share 3 pizzas. How much each?', answer: '3/7', why: '3 ÷ 7.' }],
        lab: { type: 'link', title: 'Fluency Lab: Fraction Skill Check', intro: 'Take the Fraction Operations Skill Check.', href: '../../fluency-lab/fracops.html?check', btn: 'Take the Skill Check' },
        exit: [{ q: '5/6 − 1/4 = ?', answer: '7/12', why: '10/12 − 3/12.' }, { q: '1/3 ÷ 5 = ?', answer: '1/15', why: '3 × 5.' }, { q: '3 3/4 × 2 = ?', answer: '7 1/2', why: '15/4 × 2 = 30/4.' }] },
      { n: 2, title: 'Whole Number Multiplication and Division Review', when: 'May 13–15',
        goal: 'Let’s review multi-digit multiplication and division.', stds: [S('NC.5.NBT.5', 'Multiply multi-digit whole numbers.'), S('NC.5.NBT.6', 'Divide up to 4-digit by 2-digit numbers, with remainders.')],
        targets: ['I can multiply and divide multi-digit whole numbers and interpret remainders.'], vocab: [['estimate', 'Check answers with estimates.']],
        outline: REV('IM Unit 8 Section B + multi-step word problems.'), materials: ['IM Unit 8 Section B'],
        notes: [EOG],
        practice: [{ q: '346 × 27 = ?', answer: 346 * 27, why: '9,342.' }, { q: '4,368 ÷ 52 = ?', answer: 84, why: '52 × 84 = 4,368.' }, { q: '935 ÷ 18: what is the remainder?', answer: 17, why: '18 × 51 = 918; 935 − 918 = 17.' }, { q: '163 students, 24 per bus. Buses needed?', answer: 7, why: '6 R19 → 7.' }, ch('Best estimate for 612 × 38?', ['24,000', '2,400', '240,000'], 0, '600 × 40.')],
        lab: { type: 'link', title: 'Fluency Lab: Division Skill Check', intro: 'Take the Division with Remainders Skill Check.', href: '../../fluency-lab/divide.html?check', btn: 'Take the Skill Check' },
        exit: [{ q: '58 × 64 = ?', answer: 58 * 64, why: '3,712.' }, { q: '2,945 ÷ 31 = ?', answer: 95, why: '31 × 95.' }] },
      { n: 3, title: 'Decimals Review', when: 'May 18–20',
        goal: 'Let’s review place value and decimal operations.', stds: [S('NC.5.NBT.1', 'Place value patterns; powers of 10.'), S('NC.5.NBT.3', 'Read, write, compare decimals.'), S('NC.5.NBT.7', 'Operations with decimals to hundredths.')],
        targets: ['I can compare decimals and compute with them.'], vocab: [['place value', 'Each place is 10 × the place to its right.']],
        outline: REV('Decimal review stations.'), materials: ['Decimal review stations'],
        notes: [EOG],
        practice: [ch('Compare 3.07 ___ 3.7', ['<', '>', '='], 0, '3.07 < 3.70.'), { q: '0.46 × 100 = ?', answer: 46, why: '46.' }, { q: '12.5 − 4.78 = ?', answer: 7.72, why: '12.50 − 4.78.' }, { q: '0.4 × 0.8 = ?', answer: 0.32, why: '32 hundredths.' }, { q: '6.3 ÷ 0.7 = ?', answer: 9, why: '63 tenths ÷ 7 tenths.' }, { q: 'Value of the 5 in 2.153?', answer: 0.05, why: 'Hundredths.' }],
        lab: { type: 'link', title: 'Fluency Lab: Decimal Skill Check', intro: 'Take the Decimal Operations Skill Check.', href: '../../fluency-lab/decimals.html?check', btn: 'Take the Skill Check' },
        exit: [{ q: '3.6 + 2.75 = ?', answer: 6.35, why: '3.60 + 2.75.' }, { q: '58 ÷ 1,000 = ?', answer: 0.058, why: '0.058.' }] },
      { n: 4, title: 'Volume and Measurement Review', when: 'May 21–22',
        goal: 'Let’s review volume and measurement conversions.', stds: [S('NC.5.MD.1', 'Convert measurements.'), S('NC.5.MD.4', 'Volume with unit cubes.'), S('NC.5.MD.5', 'V = l × w × h, V = B × h, two prisms.')],
        targets: ['I can find volume and convert units.'], vocab: [['cubic units', 'Units for volume.']],
        outline: REV('IM Unit 8 Section C.'), materials: ['IM Unit 8 Section C', 'Snap cubes'],
        notes: [EOG],
        practice: [{ q: 'Volume of a 6 × 4 × 5 prism?', answer: 120, why: '6 × 4 × 5.' }, { q: 'B = 18 sq cm, h = 7 cm. V?', answer: 126, why: '18 × 7.' }, { q: 'V = 96, l = 4, w = 6. h?', answer: 4, why: '96 ÷ 24.' }, { q: 'Two prisms: 3 × 3 × 2 and 5 × 2 × 2. Total volume?', answer: 38, why: '18 + 20.' }, { q: '3 ft 4 in = ? in', answer: 40, why: '36 + 4.' }, { q: '4.2 kg = ? g', answer: 4200, why: '4.2 × 1,000.' }],
        lab: { type: 'link', title: 'Fluency Lab: Volume Skill Check', intro: 'Take the Volume Skill Check.', href: '../../fluency-lab/volume.html?check', btn: 'Take the Skill Check' },
        exit: [{ q: 'Volume of a cube with 5 cm edges?', answer: 125, why: '5 × 5 × 5.' }, { q: '7 qt = ? pt', answer: 14, why: '7 × 2.' }] },
      { n: 5, title: 'Expressions, Patterns, Graphs and Shapes Review', when: 'May 26–28',
        goal: 'Let’s review order of operations, patterns, the coordinate plane, data and quadrilaterals.', stds: [S('NC.5.OA.2', 'Expressions with parentheses.'), S('NC.5.OA.3', 'Two numerical patterns.'), S('NC.5.G.1', 'Coordinate plane.'), S('NC.5.G.3', 'Classify quadrilaterals.'), S('NC.5.MD.2', 'Data and line graphs.')],
        targets: ['I can solve problems from all of these standards.'], vocab: [['ordered pair', '(x, y)']],
        outline: REV('Stations: expressions, patterns, coordinate grid, quadrilaterals, data.'), materials: ['Review stations'],
        notes: [EOG],
        practice: [{ q: '(18 − 6) ÷ 3 + 2 = ?', answer: 6, why: '12 ÷ 3 = 4; 4 + 2.' }, ch('Which expression is “3 times the sum of 7 and 5”?', ['3 × (7 + 5)', '3 × 7 + 5'], 0, 'The sum goes in parentheses.'), { q: 'A: add 3 from 0. B: add 6 from 0. B’s 5th term?', answer: 24, why: '0, 6, 12, 18, 24.' }, ch('Point at across 4, up 9?', ['(4, 9)', '(9, 4)'], 0, '(x, y).'), ch('Is every square a rhombus?', ['Always', 'Sometimes', 'Never'], 0, '4 equal sides.'), ch('Best graph for “temperature every hour”?', ['Line graph', 'Bar graph', 'Line plot'], 0, 'Changes over time.')],
        exit: [{ q: '5 + 4 × (6 − 2) = ?', answer: 21, why: '4 × 4 = 16; 5 + 16.' }, ch('“How many pets do you have?” gives…', ['numerical data', 'categorical data'], 0, 'Numbers.')] },
      { n: 6, title: 'Multi-Step Problems', when: 'May 29 – June 2',
        goal: 'Let’s solve multi-step EOG-style problems.', stds: [S('NC.5.NBT.5–7, NF.1–7, MD.1, MD.5', 'Multi-step problems across the year.')],
        targets: ['I can plan and solve multi-step problems.'], vocab: [['multi-step', 'More than one step.']],
        outline: REV('3 Reads with multi-step problems.'), materials: ['Multi-step problem sets'],
        notes: [{ t: 'key', label: 'Plan', html: '<ol style="margin:0"><li>Read 3 times: story, numbers, question.</li><li>What do I find first?</li><li>Solve each step. Label it.</li><li>Check: does the answer make sense?</li></ol>' }, EOG],
        practice: [{ q: 'Ana buys 3 notebooks at $2.45 each. She pays with $10. Change?', answer: 2.65, why: '3 × 2.45 = 7.35; 10 − 7.35.' }, { q: 'A box is 8 × 5 × 3 in. 12 boxes are packed. Total volume?', answer: 1440, why: '120 × 12.' }, { q: 'A 6 ft board: cut off 1 1/2 ft, then cut the rest into 1/2 ft pieces. How many pieces?', answer: 9, why: '4 1/2 ÷ 1/2 = 9.' }, { q: '864 cans packed 24 per case, cases cost $15 each. Total cost?', answer: 540, why: '36 cases × $15.' }],
        exit: [{ q: 'A recipe uses 3/4 cup flour per batch. Make 6 batches. Then use 1 1/2 cups for frosting. Total flour?', answer: 6, why: '4 1/2 + 1 1/2.' }] },
      { n: 7, title: 'EOG Practice', when: 'June 3–5',
        goal: 'Let’s take a mixed practice test.', stds: [S('All 5th grade standards', 'Mixed EOG practice.')],
        targets: ['I can show what I learned this year.'], vocab: [['strategy', 'Read carefully, estimate, check.']],
        outline: [o('Practice test', 40, 'Mixed EOG-style questions on this page.'), o('Reflect', 10, 'Which topics do I want to review more?')],
        materials: ['NEW released EOG form', 'Desmos calculator (calculator-active section)'],
        notes: [EOG, { t: 'tip', html: '<b>Calculator section:</b> Know when the Desmos calculator is allowed and practice with it.' }],
        practice: [{ q: '3/8 × 4 = ?', answer: '1 1/2', why: '12/8.' }, { q: '29.4 ÷ 6 = ?', answer: 4.9, why: '294 tenths ÷ 6 = 49 tenths.' }, { q: '1,512 ÷ 36 = ?', answer: 42, why: '36 × 42.' }, { q: 'Round 6.385 to the nearest hundredth.', answer: 6.39, why: '6.385 → 6.39.' }, { q: 'V of 7 × 3 × 4 prism?', answer: 84, why: '84.' }, { q: '2 2/3 + 1 5/6 = ?', answer: '4 1/2', why: '2 4/6 + 1 5/6 = 3 9/6.' }],
        exit: [{ q: '4 × (25 − 7) = ?', answer: 72, why: '4 × 18.' }, { q: '0.9 × 0.6 = ?', answer: 0.54, why: '54 hundredths.' }, { q: '2 ÷ 1/6 = ?', answer: 12, why: '2 × 6.' }] }
    ]
  });
})();
