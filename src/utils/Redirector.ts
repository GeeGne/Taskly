class Redirector {
  constructor(router) {
    this.router = router;
    this.pathname = window.location.pathname;
  }
  home (user) {
    if (user && this.pathname === '/') {
      this.router.push('/tasks', undefined, { scroll: true });
      return;
    }
  }

}

export default Redirector;