import toDollars from "../scripts/utils/money.js";

if (toDollars(2095) === '20.95'){
  console.log('passed');
}else{
  console.log('failed');
}

if (toDollars(0) === '0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

if (toDollars(6709) === '67.09'){
  console.log('passed');
}else{
  console.log('failed');
}

if (toDollars(2000.5) === '20.01'){
  console.log('passed');
}else{
  console.log('failed');
}

if (toDollars(2000.4) === '20.00'){
  console.log('passed');
}else{
  console.log('failed');
}