const { create, all } = require("mathjs");
const { BigNumber, ethers } = require("ethers");
const BigNumberJS = require("bignumber.js");
const FixedNumber = ethers.FixedNumber;

// configure the default type of numbers as BigNumbers
const config = {
  // Default type of number
  // Available options: 'number' (default), 'BigNumber', or 'Fraction'
  number: "BigNumber",

  // Number of significant digits for BigNumbers
  precision: 256,
};
const math = create(all, config);

describe("Nikal doh", () => {
  test("adds 1 + 2 to equal 3", () => {
    console.log(`you are simply awesome ${process.env.NODE_ENV}`);
    const a = BigNumber.from("55000000000000000000");
    const b = BigNumber.from("1487302857175586284");

    const oneEth = ethers.utils.parseUnits("1");
    // const r = b.mul(s).div(oneEth);
    // console.log(`output is ${r.toString()}`);

    //a.mul(b).div(oneEth)

    let spot = math.divide(
      math.bignumber("55000000000000000000"),
      math.bignumber("1487302857175586284")
    );

    // spot = math.multiply(
    //   math.bignumber(spot),
    //   math.bignumber("1000000000000000000")
    // );
    //console.log(`spot is ${spot} `);

    // const x = FixedNumber.fromString("55000000000000000000")
    //   .divUnsafe(FixedNumber.fromString("1487302857175586284"))
    //   .mulUnsafe(FixedNumber.fromString("1487302857175586284"))
    //   .round();

    const toTokenAmount = "0.678701996043210648";
    const spotPrice = "36.835017645076050459";
    const fromTokenAmount = "25000000000000000000";

    // const toTokenAmount = "0.136079866591409254";
    // const spotPrice = "36.835017645076050459";
    // const fromTokenAmount = "5908272488445526944";

    // spotPrice = fromTokenAmount/eth price
    // const y = FixedNumber.from("5908272488445526944").divUnsafe(
    //   FixedNumber.from("0.136079866591409254")
    // );
    // console.log(`y is ${y}`);

    const finalAmt = FixedNumber.fromString(toTokenAmount).mulUnsafe(
      FixedNumber.fromString(spotPrice)
    );

    const finalAmtMJS = math
      .multiply(math.bignumber(toTokenAmount), math.bignumber(spotPrice))
      .round(18);

    //const pos = FixedNumber.from(fromTokenAmount).subUnsafe(finalAmt).round();
    //  .round();
    console.log(`finalAmt is ${finalAmt} `);
    console.log(`finalAmtMJS is ${finalAmtMJS} `);
    //console.log(`pos is ${pos} `);
    // const x = FixedNumber.fromString("11")
    //   .divUnsafe(FixedNumber.fromString("3"))
    //   .mulUnsafe(FixedNumber.fromString("3"))
    //   .round(18);

    // //3.3333333333 * 3 = 10

    //console.log(`x is ${x} `);

    // const r = math.multiply(
    //   math.bignumber(`55000000000000000000`),
    //   math.bignumber(`55000000000000000000`)
    // );
    // console.log(`result is ${r}`);

    // const fromTokenAmount = math.multiply(
    //   math.bignumber(s.toString()),
    //   math.bignumber(b.toString())
    // );
    // console.log(`fromTokenAmount-> ${fromTokenAmount}`);

    const e = "1000000000000000000";
    const FTA = "5908272488445526944";
    const TTA = "136079866591409254";
    const ESP = "36069057174953073129"; //36.069057174953073128
    const CSP = ""; // current spot price

    const X = FixedNumber.from("5.908272488445526944")
      .subUnsafe(FixedNumber.from("1"))
      .divUnsafe(FixedNumber.from("0.136079866591409254")); // this is spot price

    console.log(`spot ${X}`); //
    const X2 = X.mulUnsafe(FixedNumber.from("0.136079866591409254")).addUnsafe(
      FixedNumber.from("1")
    );
    console.log(`X2 ${X2}`); //

    const DAI = math.subtract(math.bignumber(FTA), math.bignumber(e));
    const spotPP = DAI.dividedBy(math.bignumber(TTA));

    console.log(`spot price using mathjs ${spotPP}`);
    const cc = math.multiply(spotPP, math.bignumber(TTA));
    const currentDAI = math.add(cc, math.bignumber(e));

    console.log(`currentDAI using mathjs ${currentDAI}`);

    // calculate?
    // dai position

    const A = "10";
    const B = "3";

    const C = FixedNumber.from(A).divUnsafe(FixedNumber.from(B));
    const D = C.mulUnsafe(FixedNumber.from(B));

    console.log(`output of C ${C}  ${D}`);

    const CC = math.divide(math.bignumber(A), math.bignumber(B));
    const DD = math.multiply(CC, math.bignumber(B)).round();

    console.log(`output of using mathjs ${CC}  ${DD}`);

    // const EE = math.bignumber(A).dividedBy(math.bignumber(B));
    // const FF = EE.mul(math.bignumber(B));

    // console.log(`output of using mathjs ${EE}  ${FF}`);
  });

  test("BigNumbeJS", () => {
    let BNJS = BigNumberJS.clone({ EXPONENTIAL_AT: 18, MODULO_MODE: 9 });

    const c = BNJS("10").dividedBy(BNJS("3"));
    const d = c.multipliedBy(BNJS("3"));
    console.log(c.toString());
    console.log(d.toString());
  });

  test.only("mathjs", () => {
    const A = "10";
    const B = "3";

    // const C = FixedNumber.from(A).divUnsafe(FixedNumber.from(B));
    // const D = C.mulUnsafe(FixedNumber.from(B));

    // console.log(`output of C ${C}  ${D}`);

    const CC = math.divide(math.bignumber(A), math.bignumber(B));
    const DD = math.multiply(CC, math.bignumber(B));

    console.log(`output of using mathjs ${CC}  ${DD}`);
  });
});
