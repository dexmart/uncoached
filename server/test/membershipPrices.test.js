import { test } from "node:test";
import assert from "node:assert/strict";
import { isMembershipPrice, membershipPriceIds, DEFAULT_MEMBERSHIP_PRICE_IDS } from "../lib/membershipPrices.js";

test("only the four membership prices are allowed by default", () => {
    assert.equal(DEFAULT_MEMBERSHIP_PRICE_IDS.length, 4);
    assert.ok(isMembershipPrice("price_1SwUUYEWs3ZowGgCtSYjSr5c", {}));
    assert.equal(isMembershipPrice("price_1UHaFEEWs3ZowGgC92WSvIhg", {}), false); // a $0/year price
    assert.equal(isMembershipPrice("", {}), false);
});

test("STRIPE_MEMBERSHIP_PRICE_IDS replaces the list", () => {
    const env = { STRIPE_MEMBERSHIP_PRICE_IDS: " price_a, price_b " };
    assert.deepEqual(membershipPriceIds(env), ["price_a", "price_b"]);
    assert.ok(isMembershipPrice("price_b", env));
    assert.equal(isMembershipPrice("price_1SwUUYEWs3ZowGgCtSYjSr5c", env), false);
});
