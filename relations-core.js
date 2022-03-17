//Define Relations

// PERMUTATION TYPES
// max: Maximum
// min: Minimum
// val: Value, for those without max or min e.g. material type
// any: Use max or min

export class Relations {
  funcs = {};
  constructor(funcs) {
    this.funcs = funcs;
    this.rules = {
      //Tip Chord
      ct: {
        //Solve for Max
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: {
              cr: 'min',
              S: 'min',
              Afin: 'max',
            },
            solve: this.funcs.ct[1],
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'S', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'LEsw', perm: 'min' },
            ],
            solve: this.funcs.ct[2],
          },
          3: {
            enbaled: true,
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'TR', perm: 'min' },
            ],
            solve: this.funcs.ct[3],
          },
          4: {
            enbaled: false,
            vars: [
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.ct[4],
          },
          5: {
            enbaled: false,
            vars: [
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Vdiv', perm: '' },
            ],
            solve: this.funcs.ct[5],
          },
        },
      },
      //Root Chord
      cr: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'min' },
              { name: 'S', perm: 'min' },
              { name: 'Afin', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'max' },
              { name: 'S', perm: 'max' },
              { name: 'TEsw', perm: 'max' },
              { name: 'LEsw', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'max' },
              { name: 'TR', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: [
              { name: 'ct', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          5: {
            enbaled: false,
            vars: [
              { name: 'ct', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Vdiv', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Span
      S: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'min' },
              { name: 'cr', perm: 'min' },
              { name: 'Afin', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'min' },
              { name: 'cr', perm: 'max' },
              { name: 'LEsw', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'Vdiv', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          5: {
            enbaled: true,
            vars: [
              { name: 'AR', perm: 'max' },
              { name: 'Afin', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Aspect Raio
      AR: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'S', perm: 'max' },
              { name: 'Afin', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'TR', perm: 'min' },
              { name: 'LEsw', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Taper Ratio
      TR: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'AR', perm: 'min' },
              { name: 'LEsw', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'max' },
              { name: 'cr', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Area of Fin
      Afin: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'max' },
              { name: 'cr', perm: 'max' },
              { name: 'S', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'AR', perm: 'min' },
              { name: 'S', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: true,
            vars: [
              { name: 'm', perm: 'max' },
              { name: 't', perm: 'min' },
              { name: 'Mat', perm: 'val' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Normal Lift Slope
      Cna: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Kn', perm: 'max' },
              { name: 'Xfin', perm: 'min' },
              { name: 'Xcog', perm: 'max' },
              { name: 'N', perm: 'min' },
              { name: 'CnaComp', perm: 'min' },
              { name: 'Xcomp', perm: 'min' },
              { name: 'Aref', perm: 'any' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'max' },
              { name: 'TR', perm: 'min' },
              { name: 'AR', perm: 'min' },
              { name: 'TWsw', perm: 'min' },
              { name: 'LEsw', perm: 'min' },
              { name: 'Aref', perm: 'any' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Angle of Attack
      AoA: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Cn', perm: 'max' },
              { name: 'Cna', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Normal Force Coefficient
      Cn: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'AoA', perm: 'max' },
              { name: 'Cna', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Tangential Force Coefficient
      Ct: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'AoA', perm: 'max' },
              { name: 'Cta', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Lift Force Coefficient
      Cl: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Cn', perm: 'max' },
              { name: 'Ct', perm: 'max' },
              { name: 'AoA', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Drag Force Coefficient
      Cd: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Cn', perm: 'max' },
              { name: 'Ct', perm: 'max' },
              { name: 'AoA', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Lift Force
      Fl: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Cl', perm: 'max' },
              { name: 'Aref', perm: 'any' },
              { name: 'S', perm: 'max' },
              { name: 'V', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Drag Force
      Fd: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Cd', perm: 'max' },
              { name: 'Aref', perm: 'any' },
              { name: 'S', perm: 'max' },
              { name: 'V', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Stress
      Sigma: {
        type: 'symetric',
        relations: {
          enbaled: false,
          1: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 't', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 't', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 't', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: [
              { name: 'cr', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 't', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          5: {
            enbaled: false,
            vars: [
              { name: 'ct', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 't', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Thickness
      t: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: [
              { name: 'LEsw', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: [
              { name: 'LEsw', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Cn', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Deflection
      v: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: [
              { name: 'Sigma', perm: '' },
              { name: 't', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: [
              { name: 'Sigma', perm: '' },
              { name: 't', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: [
              { name: 'Sigma', perm: '' },
              { name: 't', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'TWsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: [
              { name: 'Sigma', perm: '' },
              { name: 't', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'TEsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Mass per fin
      m: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'mT', perm: 'max' },
              { name: 'N', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'Afin', perm: 'max' },
              { name: 't', perm: 'max' },
              { name: 'Mat', perm: 'val' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Total mass of fins in set
      mT: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'm', perm: 'max' },
              { name: 'N', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Number of fins in set
      N: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'm', perm: 'min' },
              { name: 'mT', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'Kn', perm: 'max' },
              { name: 'Cna', perm: 'min' },
              { name: 'Xfin', perm: 'min' },
              { name: 'CnaComp', perm: 'min' },
              { name: 'Xcomp', perm: 'min' },
              { name: 'Aref', perm: 'any' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Leading Edge Sweep
      LEsw: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'ct', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'S', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'TR', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'S', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'min' },
              { name: 'TR', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'S', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Trailing Edge Sweep
      TEsw: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'ct', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'S', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: true,
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'TR', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'S', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: true,
            vars: [
              { name: 'ct', perm: 'min' },
              { name: 'TR', perm: 'min' },
              { name: 'TEsw', perm: 'min' },
              { name: 'S', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Axial Distance of fin set
      Xfin: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: [
              { name: 'Kn', perm: 'max' },
              { name: 'Cna', perm: 'min' },
              { name: 'N', perm: 'min' },
              { name: 'Xcog', perm: 'max' },
              { name: 'CnaComp', perm: 'min' },
              { name: 'Xcomp', perm: 'min' },
              { name: 'Aref', perm: 'any' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Static Stability Margin
      Kn: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: [
              { name: 'Cna', perm: 'max' },
              { name: 'Xfin', perm: 'max' },
              { name: 'N', perm: 'max' },
              { name: 'CnaComp', perm: 'max' },
              { name: 'Xcomp', perm: 'max' },
              { name: 'N', perm: 'max' },
              { name: 'Xcog', perm: 'min' },
              { name: 'Aref', perm: 'any' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: [
              { name: 'C1', perm: '' },
              { name: 'V', perm: '' },
              { name: 'Alt', perm: '' },
              { name: 'Aref', perm: '' },
              { name: 'Cna', perm: '' },
              { name: 'CnaComp', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Mach Number
      M: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'V', perm: 'max' },
              { name: 'Ta', perm: 'min' },
              { name: 'Alt', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Velocity
      V: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'M', perm: 'max' },
              { name: 'Ta', perm: 'max' },
              { name: 'Alt', perm: 'min' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Dynamic C1 coefficient (0th order co-ef of 2nd order ODE)
      C1: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: [
              { name: 'Kn', perm: '' },
              { name: 'V', perm: '' },
              { name: 'Alt', perm: '' },
              { name: 'Aref', perm: '' },
              { name: 'Cna', perm: '' },
              { name: 'CnaComp', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: [
              { name: 'Wn', perm: '' },
              { name: 'I', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Natural Frequency
      Wn: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: [
              { name: 'C1', perm: '' },
              { name: 'I', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: [{ name: 'Tp', perm: '' }],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Damping Ratio
      Zeta: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: [
              { name: 'C2a', perm: '' },
              { name: 'C2p', perm: '' },
              { name: 'C1', perm: '' },
              { name: 'I', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Pitching Time Period
      Tp: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: [{ name: 'Wn', perm: '' }],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Normal Force
      Fn: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Cn', perm: 'max' },
              { name: 'Aref', perm: 'any' },
              { name: 'S', perm: 'max' },
              { name: 'V', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Tangential Force
      Ft: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: [
              { name: 'Ct', perm: 'max' },
              { name: 'Aref', perm: 'any' },
              { name: 'S', perm: 'max' },
              { name: 'V', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
    };
  }
}

// *** TO ADD
//*TangentialSlope - 7
//*Critical Flutter - 27
//*Divergence Velocity - 28
