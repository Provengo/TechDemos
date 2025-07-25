// E cannot happen.
Constraints.block(E).forever();
// E cannot happen before F.
Constraints.block(E).until(F);

// After E happens, never allow F.
Constraints.after(E).block(F).forever();
// F cannot happen between E and G.
Constraints.after(E).block(F).until(G);

// E can only happen 5 times.
Constraints.limit(E, 5).forever();

// E can only happen 5 times until F occurs
Constraints.limit(E, 5).until(F);

// E can happen up to 5 times (including) between G and F.
Constraints.after(G).limit(E, 5).until(F);

// Block F after E. F is unblocked after G occurs.
// This constraint is lifted when Z occurs before E does.
Constraints.unless(Z).after(E).block(F).until(G);

// A must be selected at some point in the future.
Constraints.require(A).eventually();

// A must be selected at some point in the future, unless B is selected.
Constraints.require(A).until(B);

// If A happens, then B must happen eventually.
Constraints.after(A).require(B).eventually();

// If A happens, then B must happen eventually, unless C happens.
Constraints.after(A).require(B).until(C);
