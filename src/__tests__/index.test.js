import {readFileSync} from "fs"
import {join} from "path"
import remark from "remark"
import html from "remark-html"
import externalLinks from "../"

const base = file => readFileSync(join(__dirname, "fixtures", file), "utf-8")

test("should not add target and rel", async () => {
  let {contents} = await remark().use(externalLinks, {target: null, rel: null}).use(html).process(base("input.md"))
  expect(contents).toBe(base("output.target_no.rel_no.html"))
})

test("should add target='_blank'", async () => {
  let {contents} = await remark().use(externalLinks, {target: "_blank", rel: null}).use(html).process(base("input.md"))
  expect(contents).toBe(base("output.target_blank.rel_no.html"))
})

test("should add rel='nofollow'", async () => {
  let {contents} = await remark().use(externalLinks, {target: null, rel: "nofollow"}).use(html).process(base("input.md"))
  expect(contents).toBe(base("output.target_no.rel_nofollow.html"))
})

test("should add target='_blank' and rel='nofollow'", async () => {
  let {contents} = await remark().use(externalLinks, {target: "_blank", rel: "nofollow"}).use(html).process(base("input.md"))
  expect(contents).toBe(base("output.target_blank.rel_nofollow.html"))
})

test("should add target='_blank' and rel='nofollow noopener noreferrer'", async () => {
  let {contents} = await remark().use(externalLinks).use(html).process(base("input.md"))
  expect(contents).toBe(base("output.target_blank.rel_all.html"))
})
