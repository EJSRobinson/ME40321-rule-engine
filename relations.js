//Define Relations

export class Relations {
  funcs = {};
  constructor(funcs) {
    this.funcs = funcs;
    this.rules = {
      //Tip Chord
      ct: {
        type: 'symetric',
        relations: {
          1: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Afin', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
              { name: 'TEsw', perm: '' },
              { name: 'LEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'cr', perm: 'max' },
              { name: 'TR', perm: 'max' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          5: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Vdiv', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      //Root Chord
      cr: {
        type: 'symetric',
        relations: {
          1: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Afin', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'S', perm: '' },
              { name: 'TEsw', perm: '' },
              { name: 'LEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'TR', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'S', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          5: {
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
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'Afin', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'TEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'Sigma', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          4: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'Vdiv', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          5: {
            vars: [
              { name: 'AR', perm: '' },
              { name: 'Afin', perm: '' },
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
            vars: [
              { name: 'S', perm: '' },
              { name: 'Afin', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'Cna', perm: '' },
              { name: 'TR', perm: '' },
              { name: 'LEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'Cna', perm: '' },
              { name: 'TR', perm: '' },
              { name: 'TWsw', perm: '' },
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
            vars: [
              { name: 'Cna', perm: '' },
              { name: 'AR', perm: '' },
              { name: 'LEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'Cna', perm: '' },
              { name: 'AR', perm: '' },
              { name: 'TEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
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
            vars: [
              { name: 'ct', perm: '' },
              { name: 'cr', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'AR', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'm', perm: '' },
              { name: 't', perm: '' },
              { name: 'Mat', perm: '' },
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
            vars: [
              { name: 'Kn', perm: '' },
              { name: 'Xfin', perm: '' },
              { name: 'N', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'TR', perm: '' },
              { name: 'AR', perm: '' },
              { name: 'TWsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'TR', perm: '' },
              { name: 'AR', perm: '' },
              { name: 'LEsw', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Angle of Attack
      AoA: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Cn', perm: '' },
              { name: 'Cna', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Normal Force Coefficient
      Cn: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'AoA', perm: '' },
              { name: 'Cna', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Tangential Force Coefficient
      Ct: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'AoA', perm: '' },
              { name: 'Cta', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Lift Force Coefficient
      Cl: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Cn', perm: '' },
              { name: 'Cta', perm: '' },
              { name: 'AoA', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Drag Force Coefficient
      Cd: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Cn', perm: '' },
              { name: 'Cta', perm: '' },
              { name: 'AoA', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Lift Force
      Fl: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Cl', perm: '' },
              { name: 'Afin', perm: '' },
              { name: 'S', perm: '' },
              { name: 'M', perm: '' },
              { name: 'Alt', perm: '' },
              { name: 'Ta', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Drag Force
      Fd: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Cd', perm: '' },
              { name: 'Afin', perm: '' },
              { name: 'S', perm: '' },
              { name: 'M', perm: '' },
              { name: 'Alt', perm: '' },
              { name: 'Ta', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Stress
      Sigma: {
        type: 'max0',
        relations: {
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
        type: 'max0',
        relations: {
          1: {
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
            vars: [
              { name: 'mT', perm: '' },
              { name: 'N', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'Afin', perm: '' },
              { name: 't', perm: '' },
              { name: 'Mat', perm: '' },
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
            vars: [
              { name: 'm', perm: '' },
              { name: 'N', perm: '' },
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
            vars: [
              { name: 'm', perm: '' },
              { name: 'mT', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'Kn', perm: '' },
              { name: 'Cna', perm: '' },
              { name: 'Xfin', perm: '' },
              { name: 'CnaComp', perm: '' },
              { name: 'Xcomp', perm: '' },
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
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'TEsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'TR', perm: '' },
              { name: 'TEsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'TR', perm: '' },
              { name: 'TEsw', perm: '' },
              { name: 'S', perm: '' },
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
            vars: [
              { name: 'cr', perm: '' },
              { name: 'ct', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'cr', perm: '' },
              { name: 'TR', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'S', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          3: {
            vars: [
              { name: 'ct', perm: '' },
              { name: 'TR', perm: '' },
              { name: 'LEsw', perm: '' },
              { name: 'S', perm: '' },
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
            vars: [
              { name: 'Kn', perm: '' },
              { name: 'Cna', perm: '' },
              { name: 'N', perm: '' },
              { name: 'CnaComp', perm: '' },
              { name: 'Xcomp', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
            vars: [
              { name: 'Kn', perm: '' },
              { name: 'Cna', perm: '' },
              { name: 'N', perm: '' },
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
            vars: [
              { name: 'Cna', perm: '' },
              { name: 'Xfin', perm: '' },
              { name: 'N', perm: '' },
              { name: 'CnaComp', perm: '' },
              { name: 'Xcomp', perm: '' },
              { name: 'N', perm: '' },
              { name: 'Xcog', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
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
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'V', perm: '' },
              { name: 'Ta', perm: '' },
              { name: 'Alt', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Velocity
      V: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'M', perm: '' },
              { name: 'Ta', perm: '' },
              { name: 'Alt', perm: '' },
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
            vars: [
              { name: 'C1', perm: '' },
              { name: 'I', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
          2: {
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
            vars: [{ name: 'Wn', perm: '' }],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Normal Force
      Fn: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Cn', perm: '' },
              { name: 'Afin', perm: '' },
              { name: 'S', perm: '' },
              { name: 'M', perm: '' },
              { name: 'Alt', perm: '' },
              { name: 'Ta', perm: '' },
            ],
            solve: this.funcs.testfunc,
          },
        },
      },
      // Tangential Force
      Ft: {
        type: 'max0',
        relations: {
          1: {
            vars: [
              { name: 'Ct', perm: '' },
              { name: 'Afin', perm: '' },
              { name: 'S', perm: '' },
              { name: 'M', perm: '' },
              { name: 'Alt', perm: '' },
              { name: 'Ta', perm: '' },
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
