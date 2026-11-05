/* Math · Mini-Unit on Measurement — 2 pages (NC.5.MD.1, NC.5.NBT.1), 1–2 days.
   BCS map: Making Sense of Measurement; teach Unit 6 Lessons 1 and 4–7 (skip 2–3); edited Lesson 6 page (no exponents). */
(function () {
  var MD1 = ['NC.5.MD.1', 'Convert measurements within the same system (metric and customary) and use conversions to solve multi-step problems.'];
  var NBT1 = ['NC.5.NBT.1', 'Use powers of 10 to convert metric units.'];
  var o = function (p, m, t) { return [p, m, t]; };
  LessonKit.unit({
    id: 'math-u7a', subject: 'math', short: 'Mini-Unit', title: 'Measurement', home: '../index.html', unitHref: '../unit7a.html',
    lessons: [
      { n: 1, title: 'Customary Conversions', when: 'May',
        goal: 'Let’s convert feet, inches, yards, pounds, ounces, cups, pints, quarts and gallons.', stds: [MD1],
        targets: ['I can convert from a bigger unit to a smaller unit by multiplying.', 'I can convert from a smaller unit to a bigger unit by dividing.'],
        vocab: [['convert', 'Change to a different unit.'], ['customary units', 'Inches, feet, yards, miles, ounces, pounds, cups, quarts, gallons.']],
        outline: [o('Warm-up', 10, 'Making Sense of Measurement.'), o('Activity', 30, 'Unit 6 Lessons 1, 4–5. Practice using measurement tools.'), o('Cool-down', 10, 'Exit ticket.')],
        materials: ['Making Sense of Measurement', 'Rulers, yardsticks, measuring cups', 'Conversion Craze (MD1)'],
        notes: [{ t: 'fig', table: { caption: 'Customary conversions', head: ['Length', 'Weight', 'Capacity'], rows: [['1 ft = 12 in', '1 lb = 16 oz', '1 c = 8 fl oz'], ['1 yd = 3 ft', '1 T = 2,000 lb', '1 pt = 2 c'], ['1 mi = 5,280 ft', '', '1 qt = 2 pt; 1 gal = 4 qt']] } }, { t: 'key', label: 'Big to small? Multiply. Small to big? Divide.', html: '<p style="margin:0">4 ft = 4 × 12 = 48 in. &nbsp; 48 oz = 48 ÷ 16 = 3 lb.</p>' }],
        practice: [{ q: '5 ft = ? in', answer: 60, why: '5 × 12.' }, { q: '6 yd = ? ft', answer: 18, why: '6 × 3.' }, { q: '32 oz = ? lb', answer: 2, why: '32 ÷ 16.' }, { q: '3 gal = ? qt', answer: 12, why: '3 × 4.' }, { q: '2 1/2 ft = ? in', answer: 30, why: '2.5 × 12.' }],
        exit: [{ q: '8 pt = ? qt', answer: 4, why: '8 ÷ 2.' }, { q: '4 lb = ? oz', answer: 64, why: '4 × 16.' }] },
      { n: 2, title: 'Metric Conversions and Multi-Step Problems', when: 'May',
        goal: 'Let’s convert metric units with powers of 10 and solve multi-step problems.', stds: [MD1, NBT1],
        targets: ['I can convert metric units by multiplying or dividing by 10, 100 or 1,000.', 'I can solve multi-step measurement problems.'],
        vocab: [['metric units', 'mm, cm, m, km; g, kg; mL, L.']],
        outline: [o('Warm-up', 10, 'How many centimeters tall are you? How many meters?'), o('Activity', 30, 'Unit 6 Lessons 6–7 (edited Lesson 6 page — no exponents).'), o('Cool-down', 10, 'Exit ticket.')],
        materials: ['Edited Lesson 6 student page', 'Meter sticks'],
        notes: [{ t: 'fig', table: { caption: 'Metric conversions', head: ['Length', 'Mass', 'Capacity'], rows: [['1 cm = 10 mm', '1 kg = 1,000 g', '1 L = 1,000 mL'], ['1 m = 100 cm', '', ''], ['1 km = 1,000 m', '', '']] } }, { t: 'example', title: 'Multi-step', q: 'A ribbon is 3 m. You cut off 45 cm. How many cm are left?', steps: ['3 m = 300 cm.', '300 − 45 = <b>255 cm</b>.'] }],
        practice: [{ q: '4.5 m = ? cm', answer: 450, why: '4.5 × 100.' }, { q: '2,500 g = ? kg', answer: 2.5, why: '2,500 ÷ 1,000.' }, { q: '3 L = ? mL', answer: 3000, why: '3 × 1,000.' }, { q: 'A 2 L bottle fills cups of 250 mL. How many cups?', answer: 8, why: '2,000 ÷ 250.' }],
        lab: { type: 'link', title: 'Fluency Lab: Powers of 10', intro: 'Metric conversions use powers of 10. Practice multiplying and dividing by 10, 100 and 1,000.', href: '../../fluency-lab/placevalue.html?practice&level=2', btn: 'Open Powers of 10' },
        exit: [{ q: '6 km = ? m', answer: 6000, why: '6 × 1,000.' }, { q: 'A board is 2 m. Cut off 75 cm. How many cm left?', answer: 125, why: '200 − 75.' }] }
    ]
  });
})();
