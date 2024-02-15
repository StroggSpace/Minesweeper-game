//Генератор псевдослучайных чисел в диапазоне от min до max

function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || isNaN(min) || isNaN(max)) {
    return "Пожалуйста, введите допустимые положительные целые числа для min и max";
  }

  min = min > max ? [max, (max = min)][0] : min;
  max = max < min ? [min, (min = max)][0] : max;

  let result = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  result = result < min ? min : result > max ? max : result;

  return result;
}

//Проверка длины строки

function validateLength(string, maxLength) {
  return string.length <= maxLength;
}

//Пропуск кадров
function throttle(callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

//Устранение дребезга
function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

//Перемешать массив
function shuffleAndSelect(array, count) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, count);
}

export {
  getRandomNumber,
  validateLength,
  throttle,
  debounce,
  shuffleAndSelect,
};
