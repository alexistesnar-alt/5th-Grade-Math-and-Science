/* Math · Unit 1: Finding Volume — 11 lessons (NC.5.MD.4, NC.5.MD.5), Aug 31 – Sep 17.
   Follows the BCS curriculum map: Section A (Lessons 1–2 combined, 3, 4, bonus Building Boxes),
   Section B (5–7), Section C (8–11). Problems are original. Number answers are computed below.
   To change words: edit the text inside the quotes. Keep the commas and brackets. */
(function () {
  var MD4 = ['NC.5.MD.4', 'Recognize volume as an attribute of solid figures and measure it by counting unit cubes, using cubic cm, cubic in, cubic ft, and improvised units.'];
  var MD5 = ['NC.5.MD.5', 'Relate volume to multiplication and addition: find volume with unit cubes and with V = l × w × h and V = B × h, including figures made of two prisms.'];
  // figure helpers
  var cubes = function (l, w, h, cap) { return { iso: { boxes: [{ l: l, w: w, h: h }], cubes: true, size: 24 }, caption: cap }; };
  var solid = function (l, w, h, u, cap) { u = u || ''; return { iso: { boxes: [{ l: l, w: w, h: h, labels: [l + u, w + u, h + u] }], size: Math.max(14, 30 - Math.max(l, w, h) * 1.5) }, caption: cap }; };
  var two = function (A, B, cap) { return { iso: { boxes: [A, B], size: 24 }, caption: cap }; };
  var V = function (l, w, h) { return l * w * h; };

  LessonKit.unit({
    id: 'math-u1', subject: 'math', short: 'Unit 1', title: 'Finding Volume', home: '../index.html', unitHref: '../unit1.html',
    lessons: [
      /* ======================= SECTION A ======================= */
      {
        n: 1, section: 'Section A: Unit Cubes and Volume', title: 'What Is Volume?', when: 'Aug 31 – Sep 1',
        goal: 'Let’s learn what volume is and measure it by counting unit cubes.',
        stds: [MD4],
        targets: ['I can explain that volume is the amount of space a solid figure takes up.', 'I can find volume by counting unit cubes.'],
        vocab: [['volume', 'How much space a solid figure takes up.'], ['unit cube', 'A cube 1 unit long, 1 unit wide and 1 unit tall.'], ['cubic unit', 'The unit we use for volume.'], ['solid figure', 'A 3D shape. It has length, width and height.']],
        outline: [
          ['Warm-up', 10, '<b>Notice and Wonder:</b> two boxes of cereal that are different shapes. Which holds more?'],
          ['Activity 1', 15, '<b>Let’s fill shapes.</b> Build figures with snap cubes and count how many cubes each one uses.'],
          ['Activity 2', 15, '<b>Let’s compare shapes.</b> Two figures look different. Do they have the same volume?'],
          ['Synthesis', 5, 'What does volume measure? Why do we count cubes, not squares?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Snap cubes or centimeter cubes (about 30 per group)', 'Math notebook', 'IM Unit 1 student task statements (Lessons 1–2)'],
        notes: [
          { t: 'p', html: '<p><b>Area</b> measures the space inside a flat shape, using squares. <b>Volume</b> measures the space a solid figure takes up, using <b>cubes</b>.</p>' },
          { t: 'vocab', words: [
            ['Volume', 'The amount of space a solid figure takes up.', 'A box holds 24 cubes. Its volume is 24 cubic units.'],
            ['Unit cube', 'A cube with sides 1 unit long. It has a volume of 1 cubic unit.'],
            ['Cubic units', 'The unit for volume. We can use cubic centimeters (cm³), cubic inches, cubic feet…'],
            ['Solid figure', 'A 3D shape. It has length, width and height.']
          ] },
          { t: 'fig', iso: { boxes: [{ l: 1, w: 1, h: 1 }], cubes: true, size: 60 }, caption: 'One unit cube = 1 cubic unit.' },
          { t: 'key', label: 'Remember', html: '<p style="margin:0">Volume is measured in <b>cubic units</b>. To find volume, count how many unit cubes fill the figure, with <b>no gaps</b> and <b>no overlaps</b>.</p>' },
          { t: 'fill', html: 'Volume is the amount of [[space]] a solid figure takes up. We measure volume in [[cubic units|cubic unit|cubes]]. A unit cube has a volume of [[1|one]] cubic unit.' },
          { t: 'example', title: 'Worked example: count the cubes', q: 'What is the volume of this figure?', fig: cubes(3, 2, 1), steps: ['There is only one layer.', 'Count the cubes: 3 in each row, 2 rows.', '3 + 3 = 6. The volume is <b>6 cubic units</b>.'] },
          { t: 'try', q: { q: 'What is the volume of this figure?', fig: cubes(4, 1, 2), answer: 8, unit: 'cubic units', hint: 'There are 2 layers. Count one layer, then double it.', why: '4 cubes in each layer × 2 layers = 8 cubic units.' } }
        ],
        practice: [
          { q: 'What is the volume?', fig: cubes(3, 3, 1), answer: 9, unit: 'cubic units', hint: '3 rows of 3 cubes.', why: '3 × 3 = 9 cubic units.' },
          { q: 'What is the volume?', fig: cubes(2, 2, 3), answer: 12, unit: 'cubic units', hint: 'Count the cubes in the top layer. How many layers are there?', why: '4 cubes in each layer × 3 layers = 12.' },
          { q: 'Which measures <b>volume</b>?', choices: ['How much water fits in a fish tank', 'How long a pencil is', 'How much paper covers a desk'], answer: 0, why: 'Volume is the space inside a solid: how much fits inside the tank.' },
          { q: 'Figure A uses 12 cubes. Figure B uses 10 cubes. Which has the greater volume?', choices: ['Figure A', 'Figure B', 'They are the same'], answer: 0, why: '12 cubic units is more than 10 cubic units.' },
          { q: 'Mia says the volume of a box is “20 square units.” What mistake did she make?', choices: ['Volume is measured in cubic units, not square units.', 'She should have said 20 inches.', 'There is no mistake.'], answer: 0, why: 'Square units measure area (flat). Cubic units measure volume (solid).' }
        ],
        lab: { type: 'prism', mode: 'explore', title: 'Cube Builder', lead: 'Build a prism and watch it fill up.', intro: 'Change the length, width and height. Press <b>Build it layer by layer</b> to see how many cubes fill it.', l: 3, w: 2, h: 2,
          after: [{ q: 'Make a prism 4 long, 2 wide, and 3 tall. What is its volume?', answer: V(4, 2, 3), unit: 'cubic units', why: '4 × 2 = 8 in each layer. 8 × 3 layers = 24.' }] },
        exit: [
          { q: 'What is the volume?', fig: cubes(5, 2, 1), answer: 10, unit: 'cubic units', why: '5 × 2 = 10 cubes in one layer.' },
          { q: 'What is the volume?', fig: cubes(3, 2, 2), answer: 12, unit: 'cubic units', why: '6 cubes per layer × 2 layers = 12.' },
          { q: 'What unit would you use for the volume of a lunch box?', choices: ['Cubic inches', 'Inches', 'Square inches'], answer: 0, why: 'Volume uses cubic units.' }
        ]
      },
      {
        n: 2, section: 'Section A: Unit Cubes and Volume', title: 'Counting Cubes in Layers', when: 'Sep 2',
        goal: 'Let’s count cubes we can’t see by thinking in layers.',
        stds: [MD4, MD5],
        targets: ['I can find the volume of a prism, including cubes I can’t see.', 'I can count cubes by layers.'],
        vocab: [['layer', 'One flat level of cubes in a prism.'], ['rectangular prism', 'A solid with 6 rectangle faces, like a box.']],
        outline: [
          ['Warm-up', 10, '<b>How Many Do You See?</b> A prism flashes for 3 seconds. How many cubes? How did you count?'],
          ['Activity 1', 15, '<b>Let’s count hidden cubes.</b> Build the prism and check your count.'],
          ['Activity 2', 15, '<b>Let’s count by layers.</b> Find the cubes in one layer, then count the layers.'],
          ['Synthesis', 5, 'Why is counting by layers faster than counting one by one?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Snap cubes', 'Math notebook', 'IM Unit 1 Lesson 3 task statements'],
        notes: [
          { t: 'p', html: '<p>In a picture of a prism, some cubes are <b>hidden</b>. We can’t count them one by one. Instead, we count <b>one layer</b> and multiply by the <b>number of layers</b>.</p>' },
          { t: 'example', title: 'Worked example: count by layers', fig: cubes(4, 3, 3), steps: ['Look at the top layer: 4 cubes in a row, 3 rows. That is 4 × 3 = <b>12</b> cubes.', 'Every layer is the same: 12 cubes.', 'There are 3 layers: 12 + 12 + 12 = 12 × 3 = <b>36</b>.', 'The volume is <b>36 cubic units</b> — even though we can’t see every cube.'] },
          { t: 'key', label: 'Count by layers', html: '<p style="margin:0">Volume = (cubes in one layer) × (number of layers)</p>' },
          { t: 'fill', html: 'Some cubes are hidden, so we count by [[layers|layer]]. If one layer has 10 cubes and there are 4 layers, the volume is [[40]] cubic units.' },
          { t: 'try', q: { q: 'How many cubes are in this prism?', fig: cubes(3, 3, 2), answer: 18, unit: 'cubes', hint: 'One layer is 3 × 3. How many layers?', why: '9 cubes per layer × 2 layers = 18.' } }
        ],
        practice: [
          { q: 'How many cubes are in one layer?', fig: cubes(5, 2, 3), answer: 10, hint: 'Look at the top: rows × cubes in each row.', why: '5 × 2 = 10.' },
          { q: 'What is the volume of the same prism?', fig: cubes(5, 2, 3), answer: 30, unit: 'cubic units', hint: '10 cubes in each layer. How many layers?', why: '10 × 3 = 30.' },
          { q: 'What is the volume?', fig: cubes(4, 4, 2), answer: 32, unit: 'cubic units', why: '16 per layer × 2 = 32.' },
          { q: 'A prism has 6 layers. Each layer has 8 cubes. What is its volume?', answer: 48, unit: 'cubic units', why: '8 × 6 = 48.' },
          { q: 'Ben counted only the cubes he could see and got 22. The real volume is 36. Why?', choices: ['Some cubes are hidden inside and behind.', 'He counted too many.', 'Volume can’t be counted.'], answer: 0, why: 'Cubes inside and in back are hidden. Counting by layers finds them all.' }
        ],
        lab: { type: 'prism', mode: 'explore', title: 'Layer Builder', lead: 'See the hidden cubes.', intro: 'Build a prism. Press <b>Build it layer by layer</b> and watch each layer fill in, including the hidden cubes.', l: 4, w: 3, h: 3,
          after: [{ q: 'Build a prism 3 long, 3 wide, 4 tall. How many cubes in one layer?', answer: 9, why: '3 × 3 = 9.' }, { q: 'What is its volume?', answer: 36, unit: 'cubic units', why: '9 × 4 = 36.' }] },
        exit: [
          { q: 'What is the volume?', fig: cubes(3, 2, 4), answer: 24, unit: 'cubic units', why: '6 per layer × 4 layers = 24.' },
          { q: 'Each layer has 12 cubes. There are 5 layers. What is the volume?', answer: 60, unit: 'cubic units', why: '12 × 5 = 60.' },
          { q: 'Why do we count by layers?', choices: ['Because some cubes are hidden', 'Because it is the only way to count', 'Because layers are bigger'], answer: 0, why: 'Layers let us count cubes we can’t see.' }
        ]
      },
      {
        n: 3, section: 'Section A: Unit Cubes and Volume', title: 'Same Volume, Different Prisms', when: 'Sep 3',
        goal: 'Let’s build different prisms that have the same volume.',
        stds: [MD4, MD5],
        targets: ['I can build different prisms with the same volume.', 'I can explain why turning a prism does not change its volume.'],
        vocab: [['dimensions', 'The length, width and height of a prism.']],
        outline: [
          ['Warm-up', 10, '<b>Number Talk:</b> 2 × 3 × 4. Can you find it in different orders?'],
          ['Activity 1', 20, '<b>Let’s build prisms with 24 cubes.</b> How many different ones can your group make?'],
          ['Activity 2', 10, '<b>Carter’s Candy Company</b> (optional task): design boxes that hold 24 candies.'],
          ['Synthesis', 5, 'Why do all these different prisms have the same volume?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['24 snap cubes per group', 'Recording chart', { t: 'Carter’s Candy Company (MD.4)', note: 'Optional task from the curriculum map' }],
        notes: [
          { t: 'p', html: '<p>Different prisms can have the <b>same volume</b>. A 2 × 3 × 4 prism and a 1 × 4 × 6 prism both use 24 cubes.</p>' },
          { t: 'fig', iso: { boxes: [{ l: 4, w: 3, h: 2 }, { l: 6, w: 1, h: 4, x: 7, color: '#7BA7E0' }], cubes: true, size: 18 }, caption: 'Both prisms have a volume of 24 cubic units.' },
          { t: 'key', label: 'Remember', html: '<p style="margin:0">You can multiply the dimensions in <b>any order</b>: 2 × 3 × 4 = 4 × 3 × 2 = 24. Turning a prism on its side does not change its volume.</p>' },
          { t: 'fill', html: 'A 2 × 2 × 6 prism has a volume of [[24]] cubic units. A 3 × 4 × 2 prism has a volume of [[24]] cubic units. Turning a prism does not change its [[volume]].' }
        ],
        practice: [
          { q: 'Which prism has a volume of 24 cubic units?', choices: ['2 × 3 × 4', '2 × 2 × 4', '3 × 3 × 3'], answer: 0, why: '2 × 3 × 4 = 24. The others are 16 and 27.' },
          { q: 'A prism is 1 × 2 × 12. What is its volume?', answer: 24, unit: 'cubic units', why: '1 × 2 × 12 = 24.' },
          { q: 'Choose <b>all</b> the prisms with a volume of 12 cubic units.', type: 'multi', choices: ['1 × 3 × 4', '2 × 2 × 3', '2 × 3 × 3', '1 × 1 × 12'], answer: [0, 1, 3], why: '1×3×4, 2×2×3 and 1×1×12 are all 12. 2×3×3 is 18.' },
          { q: 'Ava’s prism is 2 × 5 × 3. She turns it on its side so now it is 5 units tall. Does the volume change?', choices: ['No, it is still 30 cubic units.', 'Yes, it gets bigger.', 'Yes, it gets smaller.'], answer: 0, why: '2 × 5 × 3 = 30 in any order.' }
        ],
        lab: { type: 'prism', mode: 'hunt', V: 24, title: 'Prism Hunt: 24 Cubes', lead: 'Find every prism made of exactly 24 cubes.', intro: 'Change the length, width and height. When the prism has exactly 24 cubes, save it.' },
        exit: [
          { q: 'What is the volume of a 3 × 2 × 5 prism?', answer: 30, unit: 'cubic units', why: '3 × 2 × 5 = 30.' },
          { q: 'Which has the <b>same</b> volume as 2 × 6 × 2?', choices: ['4 × 3 × 2', '2 × 6 × 3', '6 × 6 × 1'], answer: 0, why: '2 × 6 × 2 = 24 and 4 × 3 × 2 = 24.' },
          { q: 'Find the missing number so the prism has 18 cubes: 3 × 3 × ?', answer: 2, why: '3 × 3 = 9 and 9 × 2 = 18.' }
        ]
      },
      {
        n: 4, section: 'Section A: Unit Cubes and Volume', title: 'Building Boxes (Checkpoint A)', when: 'Sep 4',
        goal: 'Let’s figure out how many cubes fill an open box, and review Section A.',
        stds: [MD4, MD5],
        targets: ['I can find how many cubes fill a box from its length, width and height.', 'I can show what I learned in Section A.'],
        vocab: [['net', 'A flat pattern that folds into a box.'], ['open box', 'A box with no lid.']],
        outline: [
          ['Warm-up', 5, 'Look at a flat box pattern (a net). What box will it fold into?'],
          ['Activity 1', 20, '<b>Let’s build boxes.</b> Fold a box from grid paper. Predict how many cubes will fill it, then fill it and check.'],
          ['Activity 2', 15, 'Section A Checkpoint.'],
          ['Synthesis', 5, 'How can you predict the number of cubes without filling the box?']
        ],
        materials: ['Grid paper box nets (optional “nets” if needed)', 'Scissors and tape', 'Centimeter cubes', 'Section A Checkpoint'],
        notes: [
          { t: 'p', html: '<p>A <b>net</b> is a flat pattern you can fold into a box. The bottom of the box tells you how many cubes fit in one layer. The height tells you how many layers.</p>' },
          { t: 'example', title: 'Worked example: fill a box', q: 'An open box has a bottom that is 5 units by 2 units. It is 3 units tall. How many cubes will fill it?', fig: solid(5, 2, 3, ''), steps: ['The bottom holds 5 × 2 = <b>10</b> cubes.', 'The box is 3 units tall, so 3 layers fit.', '10 × 3 = <b>30</b> cubes fill the box.'] },
          { t: 'write', q: 'How can you predict how many cubes fill a box without filling it?', ph: 'I can…' }
        ],
        practice: [
          { q: 'A box is 4 units long, 3 units wide, and 2 units tall. How many cubes fill it?', fig: solid(4, 3, 2), answer: 24, unit: 'cubes', hint: 'Bottom layer: 4 × 3. Then multiply by the height.', why: '12 per layer × 2 = 24.' },
          { q: 'A box holds 2 layers of 15 cubes. How many cubes fill it?', answer: 30, why: '15 × 2 = 30.' },
          { q: 'A box’s bottom is 6 × 2. It holds 36 cubes. How tall is it?', answer: 3, unit: 'units', hint: 'One layer is 6 × 2 = 12 cubes. How many layers make 36?', why: '36 ÷ 12 = 3 layers.' },
          { q: 'What is the volume?', fig: cubes(4, 2, 3), answer: 24, unit: 'cubic units', why: '8 per layer × 3 = 24.' }
        ],
        lab: { type: 'prism', mode: 'hunt', V: 18, title: 'Prism Hunt: 18 Cubes', lead: 'Find every box shape that holds exactly 18 cubes.', intro: 'Change the dimensions. Save each prism with exactly 18 cubes.' },
        exit: [
          { q: 'How many cubes fill a box 3 long, 3 wide and 3 tall?', answer: 27, why: '3 × 3 × 3 = 27.' },
          { q: 'What is the volume?', fig: cubes(5, 3, 2), answer: 30, unit: 'cubic units', why: '15 per layer × 2 = 30.' },
          { q: 'Which two prisms have the same volume?', choices: ['2 × 4 × 3 and 6 × 2 × 2', '2 × 4 × 3 and 3 × 3 × 3', '6 × 2 × 2 and 5 × 5 × 1'], answer: 0, why: 'Both are 24 cubic units.' },
          { q: 'A box holds 4 layers of 9 cubes. What is its volume?', answer: 36, unit: 'cubic units', why: '9 × 4 = 36.' }
        ]
      },

      /* ======================= SECTION B ======================= */
      {
        n: 5, section: 'Section B: Volume of Rectangular Prisms', title: 'Base × Height', when: 'Sep 8',
        goal: 'Let’s find volume by multiplying the area of the base by the height.',
        stds: [MD5],
        targets: ['I can find the area of the base of a prism.', 'I can use V = B × h to find volume.'],
        vocab: [['base', 'The bottom face of a prism.'], ['area of the base (B)', 'How many squares cover the bottom. It equals the cubes in one layer.'], ['height (h)', 'How many layers tall the prism is.']],
        outline: [
          ['Warm-up', 10, '<b>Finding the Missing Dimensions</b> warm-up (from the curriculum map, optional).'],
          ['Activity 1', 15, '<b>Let’s connect the base to one layer.</b> The area of the base = cubes in one layer.'],
          ['Activity 2', 15, '<b>Let’s use V = B × h</b> on prisms without cubes drawn.'],
          ['Synthesis', 5, 'What does B stand for? What does h stand for?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Snap cubes', 'Math notebook', 'IM Unit 1 Lesson 5 task statements'],
        notes: [
          { t: 'p', html: '<p>The <b>base</b> of a prism is its bottom face. The area of the base tells us how many cubes are in <b>one layer</b>. The <b>height</b> tells how many layers.</p>' },
          { t: 'key', label: 'Formula', html: '<p style="margin:0;font:600 22px var(--mono);color:var(--navy)">V = B × h</p><p style="margin:6px 0 0">B = area of the base (length × width) &nbsp;·&nbsp; h = height</p>' },
          { t: 'example', title: 'Worked example', q: 'The base of a prism has an area of 20 square cm. The height is 4 cm. Find the volume.', steps: ['V = B × h', 'V = 20 × 4', 'V = <b>80 cubic cm</b>'] },
          { t: 'fill', html: 'In V = B × h, the letter B means the area of the [[base]]. The letter h means the [[height]]. If B = 12 and h = 5, then V = [[60]] cubic units.' },
          { t: 'try', q: { q: 'Find the volume.', fig: solid(6, 3, 4, ' cm'), answer: V(6, 3, 4), unit: 'cubic cm', hint: 'B = 6 × 3. Then multiply by the height.', why: 'B = 18. V = 18 × 4 = 72 cubic cm.' } }
        ],
        practice: [
          { q: 'What is the area of the base (B) of this prism?', fig: solid(5, 4, 3, ' in'), answer: 20, unit: 'square in', why: 'B = 5 × 4 = 20 square inches.' },
          { q: 'What is the volume of the same prism?', fig: solid(5, 4, 3, ' in'), answer: 60, unit: 'cubic in', why: 'V = 20 × 3 = 60 cubic inches.' },
          { q: 'B = 15 square feet and h = 6 feet. What is the volume?', answer: 90, unit: 'cubic ft', why: '15 × 6 = 90.' },
          { q: 'A fish tank has a base of 30 square inches and is 10 inches tall. What is its volume?', answer: 300, unit: 'cubic in', why: '30 × 10 = 300 cubic inches.' },
          { q: 'Which expression shows V = B × h for a prism with base 4 × 7 and height 2?', choices: ['(4 × 7) × 2', '4 + 7 + 2', '(4 + 7) × 2'], answer: 0, why: 'B = 4 × 7. Then multiply by h = 2.' }
        ],
        lab: { type: 'prism', mode: 'explore', title: 'Base and Layers', lead: 'Watch the base become a layer.', intro: 'Build a prism. The first layer has the same number of cubes as the area of the base. Each new layer adds that many again.', l: 5, w: 2, h: 3,
          after: [{ q: 'A prism has a base of 5 × 2. How many cubes are in one layer?', answer: 10, why: '5 × 2 = 10.' }, { q: 'With a height of 4, what is the volume?', answer: 40, unit: 'cubic units', why: '10 × 4 = 40.' }] },
        exit: [
          { q: 'B = 24 square cm, h = 3 cm. What is V?', answer: 72, unit: 'cubic cm', why: '24 × 3 = 72.' },
          { q: 'Find the volume.', fig: solid(7, 2, 5, ' m'), answer: 70, unit: 'cubic m', why: 'B = 14. V = 14 × 5 = 70.' },
          { q: 'What does the area of the base tell you?', choices: ['How many cubes fit in one layer', 'How tall the prism is', 'How many layers there are'], answer: 0, why: 'The base area = number of cubes in one layer.' }
        ]
      },
      {
        n: 6, section: 'Section B: Volume of Rectangular Prisms', title: 'Writing Volume Expressions', when: 'Sep 9',
        goal: 'Let’s write different expressions for the volume of the same prism.',
        stds: [MD5, ['NC.5.OA.2', 'Write and evaluate expressions with parentheses (connection).']],
        targets: ['I can use V = l × w × h.', 'I can write more than one expression for the same volume.'],
        vocab: [['expression', 'Numbers and operation signs that show a value, like 3 × 4 × 5.'], ['length, width, height', 'The three dimensions of a prism.']],
        outline: [
          ['Warm-up', 10, '<b>True or False:</b> 2 × 3 × 5 = 5 × 2 × 3? (2 × 3) × 5 = 2 × (3 × 5)?'],
          ['Activity 1', 15, '<b>Let’s match expressions to prisms.</b>'],
          ['Activity 2', 15, '<b>Let’s write our own expressions</b> for the same volume.'],
          ['Synthesis', 5, 'Why do (l × w) × h and l × (w × h) give the same answer?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Expression matching cards', 'Math notebook'],
        notes: [
          { t: 'key', label: 'Two formulas, same idea', html: '<p style="margin:0;font:600 20px var(--mono);color:var(--navy)">V = l × w × h &nbsp;&nbsp; V = B × h</p><p style="margin:6px 0 0">Both multiply the same three numbers. You can group them in any order.</p>' },
          { t: 'example', title: 'Worked example: many expressions, one volume', fig: solid(4, 3, 5, ' cm'), steps: ['l × w × h: 4 × 3 × 5 = 60', '(4 × 3) × 5 = 12 × 5 = 60 (base first, then height)', '4 × (3 × 5) = 4 × 15 = 60 (a side face first)', 'Every expression gives <b>60 cubic cm</b>.'] },
          { t: 'fill', html: 'For a prism 2 by 6 by 5, the expression (2 × 6) × 5 equals [[60]]. The expression 2 × (6 × 5) also equals [[60]].' },
          { t: 'tip', html: '<b>Tip:</b> Look for friendly pairs. 4 × 5 × 7 → do 4 × 5 = 20 first, then 20 × 7 = 140.' }
        ],
        practice: [
          { q: 'Which expression does <b>not</b> show the volume of a 3 × 4 × 6 prism?', choices: ['3 + 4 + 6', '(3 × 4) × 6', '3 × (4 × 6)', '12 × 6'], answer: 0, why: 'Volume multiplies the dimensions. 3 + 4 + 6 adds them.' },
          { q: 'Evaluate (5 × 2) × 8.', answer: 80, hint: 'Parentheses first: 5 × 2 = 10.', why: '10 × 8 = 80.' },
          { q: 'Find the volume. Use a friendly pair!', fig: solid(5, 7, 2, ' ft'), answer: 70, unit: 'cubic ft', why: '5 × 2 = 10, then 10 × 7 = 70.' },
          { q: 'Choose <b>all</b> expressions equal to the volume of a 2 × 5 × 9 prism.', type: 'multi', choices: ['(2 × 5) × 9', '10 × 9', '2 × 45', '2 + 5 × 9'], answer: [0, 1, 2], why: 'They all equal 90. 2 + 5 × 9 = 47.' }
        ],
        lab: { type: 'prism', mode: 'explore', title: 'Turn and Check', lead: 'Different order, same volume.', intro: 'Build a 2 × 3 × 4 prism. Then build 4 × 2 × 3 and 3 × 4 × 2. Do they hold the same number of cubes?', l: 2, w: 3, h: 4,
          after: [{ q: 'What is the volume of 2 × 3 × 4, 4 × 2 × 3, and 3 × 4 × 2?', answer: 24, unit: 'cubic units', why: 'All three are 24. Changing the order does not change the product.' }] },
        exit: [
          { q: 'Evaluate 6 × (2 × 5).', answer: 60, why: '2 × 5 = 10; 6 × 10 = 60.' },
          { q: 'A prism is 8 in by 3 in by 2 in. What is its volume?', answer: 48, unit: 'cubic in', why: '8 × 3 × 2 = 48.' },
          { q: 'Which expression shows V = B × h for a prism 7 long, 4 wide, 3 tall?', choices: ['28 × 3', '7 + 4 + 3', '11 × 3'], answer: 0, why: 'B = 7 × 4 = 28. V = 28 × 3.' }
        ]
      },
      {
        n: 7, section: 'Section B: Volume of Rectangular Prisms', title: 'Find the Missing Dimension', when: 'Sep 10',
        goal: 'Let’s use the volume to find a missing length, width or height.',
        stds: [MD5],
        targets: ['I can find a missing dimension when I know the volume.', 'I can use division to find a missing factor.'],
        vocab: [['missing dimension', 'A length, width or height we don’t know yet.'], ['factor', 'A number we multiply.']],
        outline: [
          ['Warm-up', 10, '<b>Number Talk:</b> 6 × ? = 48. 12 × ? = 60. How do you know?'],
          ['Activity 1', 15, '<b>Let’s find the missing height</b> when we know the base and the volume.'],
          ['Activity 2', 15, '<b>Let’s find any missing dimension</b> (rewritten Lesson 7, Activity 2).'],
          ['Synthesis', 5, 'What operation helps find a missing factor?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['G5-U1 Lesson 7 Activity 2 (rewritten, from the curriculum map)', 'Snap cubes', 'Math notebook'],
        notes: [
          { t: 'p', html: '<p>Sometimes we know the <b>volume</b> but not one of the dimensions. Think: <b>what times what makes the volume?</b> Then divide.</p>' },
          { t: 'example', title: 'Worked example: missing height', q: 'A box has a volume of 60 cubic cm. Its base is 5 cm by 3 cm. How tall is it?', fig: { iso: { boxes: [{ l: 5, w: 3, h: 4, labels: ['5 cm', '3 cm', '? cm'] }], size: 26 } }, steps: ['Find the base: 5 × 3 = 15 square cm.', 'Think: 15 × ? = 60.', '60 ÷ 15 = <b>4</b>. The box is 4 cm tall.', 'Check: 5 × 3 × 4 = 60 ✓'] },
          { t: 'key', label: 'Missing dimension', html: '<p style="margin:0">Volume ÷ (the other two dimensions multiplied) = missing dimension</p>' },
          { t: 'fill', html: 'If V = 40 and B = 8, then the height is 40 ÷ 8 = [[5]]. To find a missing factor, we [[divide|division]].' }
        ],
        practice: [
          { q: 'V = 48 cubic units. Base = 12 square units. What is the height?', answer: 4, unit: 'units', why: '48 ÷ 12 = 4.' },
          { q: 'A prism is 6 long and 2 wide. Its volume is 36 cubic units. How tall is it?', fig: { iso: { boxes: [{ l: 6, w: 2, h: 3, labels: ['6', '2', '?'] }], size: 24 } }, answer: 3, unit: 'units', hint: 'Base = 6 × 2 = 12. 12 × ? = 36.', why: '36 ÷ 12 = 3.' },
          { q: 'A box has volume 80 cubic in. It is 4 in wide and 5 in tall. How long is it?', answer: 4, unit: 'in', hint: '4 × 5 = 20. 20 × ? = 80.', why: '80 ÷ 20 = 4 in.' },
          { q: 'A cube-shaped box has a volume of 27 cubic cm. How long is each edge?', answer: 3, unit: 'cm', hint: 'A cube has all edges the same: ? × ? × ? = 27.', why: '3 × 3 × 3 = 27.' }
        ],
        lab: { type: 'prism', mode: 'hunt', V: 36, title: 'Prism Hunt: 36 Cubes', lead: 'Every prism here has a volume of 36. Find the missing dimensions!', intro: 'Find every prism with a volume of 36 cubic units.' },
        exit: [
          { q: 'V = 72 cubic cm. The base is 9 square cm. Find the height.', answer: 8, unit: 'cm', why: '72 ÷ 9 = 8.' },
          { q: 'A prism is 5 long and 4 wide. V = 60. How tall is it?', answer: 3, unit: 'units', why: '5 × 4 = 20. 60 ÷ 20 = 3.' },
          { q: 'Which equation can find the missing height?', choices: ['54 ÷ (3 × 6) = h', '54 × 3 × 6 = h', '54 − 3 − 6 = h'], answer: 0, why: 'Divide the volume by the area of the base.' }
        ]
      },

      /* ======================= SECTION C ======================= */
      {
        n: 8, section: 'Section C: Volume of Solid Figures', title: 'Figures Made of Two Prisms', when: 'Sep 11',
        goal: 'Let’s find the volume of a figure by breaking it into two prisms.',
        stds: [MD5],
        targets: ['I can break a figure into two rectangular prisms.', 'I can add the volumes of the two prisms.'],
        vocab: [['decompose', 'Break apart into smaller parts.'], ['composite figure', 'A figure made of two or more prisms.']],
        outline: [
          ['Warm-up', 10, '<b>Notice and Wonder:</b> an L-shaped figure made of cubes.'],
          ['Activity 1', 15, '<b>Decomposing Irregular Prisms</b> (task from the curriculum map). Find two ways to split the figure.'],
          ['Activity 2', 15, '<b>Let’s find the volume</b> of each part and add.'],
          ['Synthesis', 5, 'Does it matter how you split the figure? Why not?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Decomposing Irregular Prisms task', 'Snap cubes in two colors', 'Colored pencils'],
        notes: [
          { t: 'p', html: '<p>Some figures are not one box. We can <b>decompose</b> them into two rectangular prisms, find each volume, and <b>add</b>.</p>' },
          { t: 'example', title: 'Worked example: an L-shaped figure', fig: two({ l: 6, w: 3, h: 2, labels: ['6', '3', '2'] }, { l: 2, w: 3, h: 3, z: 2, color: '#7BA7E0', labels: ['', '', '3'] }, 'Orange: 6 by 3 by 2. Blue (on top): 2 by 3 by 3.'), steps: ['Split it into a bottom prism (orange) and a top prism (blue).', 'Orange: 6 × 3 × 2 = 36 cubic units.', 'Blue: 2 × 3 × 3 = 18 cubic units.', 'Add: 36 + 18 = <b>54 cubic units</b>.'] },
          { t: 'key', label: 'Two prisms', html: '<p style="margin:0">V = (volume of prism 1) + (volume of prism 2)</p>' },
          { t: 'fill', html: 'To find the volume of a figure made of two prisms, find the volume of each prism, then [[add|addition]] them. Splitting the figure a different way gives the [[same]] total volume.' }
        ],
        practice: [
          { q: 'Find the total volume.', fig: two({ l: 4, w: 2, h: 2, labels: ['4', '2', '2'] }, { l: 2, w: 2, h: 2, z: 2, color: '#7BA7E0', labels: ['', '', '2'] }, 'Orange: 4 by 2 by 2. Blue (on top): 2 by 2 by 2.'), answer: V(4, 2, 2) + V(2, 2, 2), unit: 'cubic units', hint: 'Orange: 4 × 2 × 2. Blue: 2 × 2 × 2. Add.', why: '16 + 8 = 24.' },
          { q: 'Prism A is 5 × 3 × 2. Prism B is 4 × 3 × 1. What is the total volume?', answer: V(5, 3, 2) + V(4, 3, 1), unit: 'cubic units', why: '30 + 12 = 42.' },
          { q: 'Which expression finds the volume of a figure made of a 3 × 3 × 4 prism and a 2 × 3 × 2 prism?', choices: ['(3 × 3 × 4) + (2 × 3 × 2)', '3 × 3 × 4 × 2 × 3 × 2', '(3 + 3 + 4) + (2 + 3 + 2)'], answer: 0, why: 'Find each volume, then add.' },
          { q: 'A stair step figure has a bottom prism 6 × 2 × 1 and a top prism 3 × 2 × 1. What is the volume?', answer: 18, unit: 'cubic units', why: '12 + 6 = 18.' }
        ],
        lab: { type: 'prism', mode: 'composite', title: 'Split the Figure', lead: 'Decompose, find each volume, then add.', intro: 'This figure is made of two rectangular prisms. Press the button to split it. Then find each volume.', cubes: true, size: 22,
          parts: [{ l: 5, w: 3, h: 2, x: 0, y: 0, z: 0 }, { l: 2, w: 3, h: 2, x: 3, y: 0, z: 2 }] },
        exit: [
          { q: 'Find the total volume.', fig: two({ l: 5, w: 2, h: 3, labels: ['5', '2', '3'] }, { l: 3, w: 2, h: 2, x: 5, color: '#7BA7E0', labels: ['3', '2', '2'] }), answer: V(5, 2, 3) + V(3, 2, 2), unit: 'cubic units', why: '30 + 12 = 42.' },
          { q: 'Prism 1: V = 40. Prism 2: V = 24. What is the volume of the whole figure?', answer: 64, unit: 'cubic units', why: '40 + 24 = 64.' },
          { q: 'Kai split a figure one way. Lena split it another way. Who gets the right volume?', choices: ['Both, if they each add their two parts correctly', 'Only Kai', 'Only Lena'], answer: 0, why: 'The total space doesn’t change when you split it differently.' }
        ]
      },
      {
        n: 9, section: 'Section C: Volume of Solid Figures', title: 'Volume in the Real World', when: 'Sep 14',
        goal: 'Let’s solve real problems about how much fits inside.',
        stds: [MD5],
        targets: ['I can solve word problems about volume.', 'I can use the right cubic unit in my answer.'],
        vocab: [['cubic feet', 'Volume unit for big things like rooms and cabinets.'], ['cubic inches', 'Volume unit for small things like boxes.']],
        outline: [
          ['Warm-up', 10, '<b>Estimation:</b> How many cubic feet of space is our classroom closet?'],
          ['Activity 1', 20, '<b>Cabinet Space</b> (MD.5 task from the curriculum map): which cabinet holds the most?'],
          ['Activity 2', 10, '<b>Let’s solve word problems</b> about storage.'],
          ['Synthesis', 5, 'How do you choose cubic inches, feet or centimeters?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Cabinet Space task (MD.5)', 'Rulers or measuring tape', 'Math notebook'],
        notes: [
          { t: 'p', html: '<p>Volume helps us answer questions like “Will it fit?” and “Which holds more?” Read carefully, find the dimensions, and label your answer with <b>cubic</b> units.</p>' },
          { t: 'example', title: 'Worked example', q: 'A toy chest is 4 feet long, 2 feet wide and 2 feet tall. A shelf box is 3 feet long, 3 feet wide and 1 foot tall. Which holds more?', steps: ['Toy chest: 4 × 2 × 2 = 16 cubic feet.', 'Shelf box: 3 × 3 × 1 = 9 cubic feet.', '16 > 9, so the <b>toy chest</b> holds more, by 16 − 9 = 7 cubic feet.'] },
          { t: 'tip', html: '<b>Read like a mathematician (3 Reads):</b> 1st read: What is the story? 2nd read: What are the numbers? 3rd read: What is the question?' }
        ],
        practice: [
          { q: 'A cabinet is 3 ft wide, 2 ft deep, and 6 ft tall. What is its volume?', answer: 36, unit: 'cubic ft', why: '3 × 2 × 6 = 36.' },
          { q: 'Cabinet A is 36 cubic ft. Cabinet B is 4 ft × 2 ft × 5 ft. How much <b>more</b> space does Cabinet B have?', answer: 40 - 36, unit: 'cubic ft', hint: 'Find B’s volume first: 4 × 2 × 5.', why: 'B = 40. 40 − 36 = 4 cubic ft.' },
          { q: 'A box is 10 in long, 5 in wide, and 4 in tall. What is its volume?', answer: 200, unit: 'cubic in', why: '10 × 5 × 4 = 200.' },
          { q: 'A sandbox is 6 ft by 4 ft. It is filled 2 ft deep with sand. How many cubic feet of sand?', answer: 48, unit: 'cubic ft', why: '6 × 4 × 2 = 48.' },
          { q: 'Which unit is best for the volume of a swimming pool?', choices: ['Cubic feet', 'Cubic centimeters', 'Square feet'], answer: 0, why: 'A pool is big, so cubic feet (or meters) make sense.' }
        ],
        lab: { type: 'prism', mode: 'explore', title: 'Storage Designer', lead: 'Design a storage cabinet.', intro: 'Each cube is 1 cubic foot. Design a cabinet that holds <b>exactly 24 cubic feet</b> and is no more than 6 feet tall.', l: 2, w: 2, h: 6, after: [{ q: 'A cabinet is 2 ft × 2 ft × 6 ft. Does it hold exactly 24 cubic feet?', choices: ['Yes', 'No'], answer: 0, why: '2 × 2 × 6 = 24.' }] },
        exit: [
          { q: 'A closet is 5 ft long, 3 ft wide and 8 ft tall. What is its volume?', answer: 120, unit: 'cubic ft', why: '5 × 3 × 8 = 120.' },
          { q: 'Box A: 6 × 2 × 3 inches. Box B: 4 × 4 × 2 inches. Which holds more?', choices: ['Box A (36 cubic in)', 'Box B (32 cubic in)', 'They are the same'], answer: 0, why: '36 > 32.' },
          { q: 'A planter is 8 ft long, 2 ft wide, filled 1 ft deep with soil. How much soil?', answer: 16, unit: 'cubic ft', why: '8 × 2 × 1 = 16.' }
        ]
      },
      {
        n: 10, section: 'Section C: Volume of Solid Figures', title: 'Design a Box', when: 'Sep 15',
        goal: 'Let’s design boxes that meet a volume goal.',
        stds: [MD4, MD5],
        targets: ['I can design a box with a given volume.', 'I can explain why my box works.'],
        vocab: [['design', 'Plan something to meet a goal.']],
        outline: [
          ['Warm-up', 10, '<b>Which One Doesn’t Belong?</b> Four boxes — which volume is different?'],
          ['Activity 1', 20, '<b>Build a Box</b> (MD.4 task from the curriculum map): design a box for 48 cubes.'],
          ['Activity 2', 10, 'Gallery walk: compare designs. Which uses the least cardboard?'],
          ['Synthesis', 5, 'Same volume, different shapes — which shape is best for shipping?'],
          ['Cool-down', 5, 'Exit ticket.']
        ],
        materials: ['Build a Box task (MD.4)', 'Grid paper, scissors, tape', 'Snap cubes'],
        notes: [
          { t: 'p', html: '<p>Engineers design boxes to hold a certain amount. Many boxes can have the same volume. To design one, find three numbers that <b>multiply</b> to the volume you need.</p>' },
          { t: 'example', title: 'Worked example: design for 48 cubes', steps: ['Find factors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.', 'Pick three that multiply to 48: 4 × 4 × 3 = 48 ✓', 'Other designs: 2 × 4 × 6, 2 × 3 × 8, 1 × 6 × 8 …', 'A box close to a cube (like 4 × 4 × 3) uses less cardboard.'] },
          { t: 'write', q: 'Design a box that holds 60 cubes. Write its length, width and height. Show it works.', ph: 'My box is ___ × ___ × ___ because…' }
        ],
        practice: [
          { q: 'Which box holds exactly 48 cubes?', choices: ['2 × 4 × 6', '3 × 4 × 5', '4 × 4 × 4'], answer: 0, why: '2 × 4 × 6 = 48.' },
          { q: 'A box must hold 40 cubes. It is 5 long and 2 wide. How tall must it be?', answer: 4, why: '5 × 2 = 10. 40 ÷ 10 = 4.' },
          { q: 'Choose <b>all</b> boxes that hold 30 cubes.', type: 'multi', choices: ['2 × 3 × 5', '1 × 5 × 6', '3 × 3 × 3', '1 × 3 × 10'], answer: [0, 1, 3], why: '2×3×5, 1×5×6 and 1×3×10 are 30. 3×3×3 is 27.' },
          { q: 'Two boxes: 4 × 4 × 3 and 2 × 2 × 12. What is true?', choices: ['They have the same volume (48).', 'The first holds more.', 'The second holds more.'], answer: 0, why: 'Both equal 48 cubic units.' }
        ],
        lab: { type: 'prism', mode: 'hunt', V: 48, max: 12, title: 'Box Designer: 48 Cubes', lead: 'How many box designs hold exactly 48 cubes?', intro: 'Find as many designs as you can (up to 12 on a side).' },
        exit: [
          { q: 'Write the missing number: 3 × ? × 4 = 36.', answer: 3, why: '3 × 4 = 12. 36 ÷ 12 = 3.' },
          { q: 'Which design holds 24 cubes?', choices: ['2 × 2 × 6', '2 × 3 × 3', '4 × 4 × 2'], answer: 0, why: '2 × 2 × 6 = 24.' },
          { q: 'A box holds 64 cubes. It is a cube (all sides equal). How long is each side?', answer: 4, why: '4 × 4 × 4 = 64.' }
        ]
      },
      {
        n: 11, section: 'Section C: Volume of Solid Figures', title: 'Putting Volume Together', when: 'Sep 16–17',
        goal: 'Let’s solve multi-step volume problems and get ready for the unit test.',
        stds: [MD4, MD5],
        targets: ['I can solve multi-step volume problems.', 'I can choose the best strategy: count, l × w × h, B × h, or add two prisms.'],
        vocab: [['multi-step', 'A problem that takes more than one step to solve.']],
        outline: [
          ['Warm-up', 10, '<b>Number Talk:</b> 25 × 4 × 3. Which pair would you multiply first?'],
          ['Activity 1', 20, '<b>Cubix Factory Storage</b> (MD.5 task from the curriculum map).'],
          ['Activity 2', 10, 'Unit review stations.'],
          ['Synthesis', 5, 'Which strategy do you use most? When do you add?'],
          ['Unit test', 0, 'SchoolNet Unit 1 assessment (Desmos calculator available). Remember: type only digits — no units, no commas.']
        ],
        materials: ['Cubix Factory Storage task (MD.5)', 'Unit 1 review', 'Practice Problems (IM Unit 1)'],
        notes: [
          { t: 'key', label: 'Volume strategies', html: '<ul style="margin:0"><li><b>Count cubes</b> by layers (when cubes are shown)</li><li><b>V = l × w × h</b> (when you know all three)</li><li><b>V = B × h</b> (when you know the base area)</li><li><b>Missing side:</b> divide the volume</li><li><b>Two prisms:</b> find each, then add</li></ul>' },
          { t: 'example', title: 'Worked example: multi-step', q: 'A factory has two storage rooms. Room A is 10 ft × 8 ft × 9 ft. Room B is 6 ft × 5 ft × 9 ft. How much storage in all?', steps: ['Room A: 10 × 8 × 9 = 720 cubic ft.', 'Room B: 6 × 5 × 9 = 270 cubic ft.', 'Total: 720 + 270 = <b>990 cubic ft</b>.'] },
          { t: 'tip', html: '<b>On the EOG and unit test:</b> type only the number (like 990). Don’t type units or commas.' }
        ],
        practice: [
          { q: 'Find the volume.', fig: two({ l: 6, w: 4, h: 2, labels: ['6', '4', '2'] }, { l: 3, w: 4, h: 3, z: 2, color: '#7BA7E0', labels: ['', '', '3'] }, 'Orange: 6 by 4 by 2. Blue (on top): 3 by 4 by 3.'), answer: V(6, 4, 2) + V(3, 4, 3), unit: 'cubic units', why: '48 + 36 = 84.' },
          { q: 'A box is 12 in × 5 in × 3 in. What is its volume?', answer: 180, unit: 'cubic in', why: '12 × 5 × 3 = 180.' },
          { q: 'A prism has V = 90 cubic cm and a base area of 15 square cm. What is the height?', answer: 6, unit: 'cm', why: '90 ÷ 15 = 6.' },
          { q: 'A shipping crate is 4 ft × 3 ft × 3 ft. A company ships 5 crates. What is the total volume?', answer: 5 * V(4, 3, 3), unit: 'cubic ft', hint: 'Find one crate’s volume first.', why: '4 × 3 × 3 = 36. 36 × 5 = 180.' },
          { q: 'Which expression finds the volume of a 7 × 2 × 5 prism the fastest?', choices: ['7 × (2 × 5) = 7 × 10', '(7 × 2) × 5 = 14 × 5', 'Both are correct'], answer: 2, why: 'Both give 70. 2 × 5 = 10 is a friendly pair.' }
        ],
        lab: { type: 'prism', mode: 'composite', title: 'Factory Shelves', lead: 'A storage shelf made of two prisms.', intro: 'Each cube is one storage bin. Split the shelf into two prisms and count the bins.', cubes: true, size: 20,
          parts: [{ l: 6, w: 2, h: 2, x: 0, y: 0, z: 0 }, { l: 6, w: 2, h: 3, x: 0, y: 2, z: 0 }] },
        exit: [
          { q: 'Find the volume of a prism 9 × 3 × 4.', answer: 108, unit: 'cubic units', why: '9 × 3 × 4 = 108.' },
          { q: 'A figure is made of a 4 × 3 × 2 prism and a 4 × 3 × 5 prism. What is its volume?', answer: V(4, 3, 2) + V(4, 3, 5), unit: 'cubic units', why: '24 + 60 = 84.' },
          { q: 'V = 56 cubic ft. Length = 7 ft, width = 2 ft. What is the height?', answer: 4, unit: 'ft', why: '7 × 2 = 14. 56 ÷ 14 = 4.' },
          { q: 'What is the volume?', fig: cubes(4, 3, 3), answer: 36, unit: 'cubic units', why: '12 per layer × 3 = 36.' }
        ]
      }
    ]
  });
})();
