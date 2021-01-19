import cryptoHash, { Options } from "crypto-random-string"


export function hashScope() {
  //@ts-ignore
  let i: BigInt = 0n
  return function hash(options: Options = {type: "base64", length: 15}) {
    return ((i as any)++) + cryptoHash(options)
  }
}

export default hashScope()