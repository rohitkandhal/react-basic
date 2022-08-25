// Like the name states, an intersection observer is an observer that observes intersections between DOM elements. You set a element as a watcher, (MDN calls it a root), to watch a target element. When the target is going to intersect with the root, you invoke a callback.

/*
<nav id="header" class="collapsible-header">
  Header
</nav>

<main id="content">
  <section class="my-section">
    Section 1
  </section>
    <section class="my-section">
    Section 2
  </section>
    Section 3
  </section>
</main>

.collapsible-header {
  position: sticky;
  width: 100%;
  top: 0;
}
*/