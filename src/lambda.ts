// Unary function type for constructing functions
export type Fun = (a: Fun) => Fun

export const True = (truthy: Fun) => (falsy: Fun): Fun => truthy
export const False = (truthy: Fun) => (falsy: Fun): Fun => falsy

// ∧ ≡ λxy.xy(λuv.v) ≡ λxy.xyF
export const AND = (x: Fun) => (y: Fun) => x(y)(False)

// ∨ ≡ λxy.x(λuv.u)y ≡ λxy.xTy
export const OR = (x: Fun) => (y: Fun) => x(True)(y)

// ¬ ≡ λx.x(λuv.v)(λab.a) ≡ λx.xFT
export const NOT = (x: Fun) => x(False)(True)

export function runLambda() {
  console.log('AND: T T', AND(True)(True))
  console.log('AND: F T', AND(False)(True))
  console.log('AND: T F', AND(True)(False))
  console.log('AND: F F', AND(False)(False))
}