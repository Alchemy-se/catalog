# Foo

- Foo can do anything.
- So what, you might think?
- Even hot reloading
- This is awesome

```react
initialState:
  a: 0
  b: 10
---
<Foo name={`${state.a} – ${state.b}`}>
  <button onClick={() => setState(({a}) => ({a: state.a + 1}))}>a + 1</button>
  <button onClick={() => setState(({b}) => ({b: state.b + 1}))}>b + 1</button>
</Foo>
```

### What is `Foo`?

- `children`: `node`

```react
<Foo>
  <Foo>Bar</Foo>
  <Foo>
    asdf
    <Foo>Bar</Foo>
  </Foo>
  <p style={{fontWeight: 'bold'}}>Bar</p>
</Foo>
```
