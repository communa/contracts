import { assert } from "chai";
import { ethers } from "hardhat";

// https://github.com/PatrickAlphaC/hardhat-simple-storage-fcc

describe("SimpleStorage", function () {
  it("Should start with a favorite number of 0", async function () {
    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );
    const simpleStorage = await simpleStorageFactory.deploy();

    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue)
  });

  it("Should update when we call store", async function () {
    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );
    const simpleStorage = await simpleStorageFactory.deploy();

    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  // Extra - this is not in the video
  it("Should work correctly with the people struct and array", async function () {
    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );
    const simpleStorage = await simpleStorageFactory.deploy();

    const expectedPersonName = "Patrick";
    const expectedFavoriteNumber = "16";
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    );
    await transactionResponse.wait(1);
    const { favoriteNumber, name } = await simpleStorage.people(0);
    // We could also do it like this
    // const person = await simpleStorage.people(0)
    // const favNumber = person.favoriteNumber
    // const pName = person.name

    assert.equal(name, expectedPersonName);
    assert.equal(favoriteNumber, expectedFavoriteNumber);
  });
});
