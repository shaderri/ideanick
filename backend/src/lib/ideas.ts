import _ from 'lodash'

// Создаём массив из 100 "идей", с уникальными полями для каждой
export const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`, // уникальный "ник" идеи
  name: `Idea ${i}`, // название идеи
  description: `Description of idea ${i}...`, // краткое описание
  text: _.times(100, (j) => `<p>Text paragrph ${j} of idea ${i}...</p>`).join(''),
  // длинный текст, состоящий из 100 p
}))
