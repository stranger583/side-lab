export default function bubbleSort(arr: number[]) {
  let n = arr.length;
  let swapped;
  // 外層循環控制遍歷次數
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    // 內層循環逐一比較相鄰的元素
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交換元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    // 如果沒有發生交換，則說明陣列已經有序，提前結束
    if (!swapped) break;
  }
  return arr;
}
