import React from "react";
import { create } from "react-test-renderer";
import Details from "../Details";

test(" Details Component Snapshot", () => {
  const c = create(<Details />);
  expect(c.toJSON()).toMatchSnapshot();
});

test("Show Modal when toggle modal is called", () => {
  const c = create(<Details />);
  const instance = c.getInstance();
  expect(instance.state.showModal).toBe(false);
  instance.toggleModal();
  expect(instance.state.showModal).toBe(true);
});
