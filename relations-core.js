//Define Relations

// PERMUTATION TYPES
// max: Maximum, if any values can used, max is written
// min: Minimum
// val: Value, for those without max or min e.g. material type

export class Relations {
  funcs = {};
  constructor(funcs) {
    this.funcs = funcs;
    this.rules = {
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
            vars: {
              cr: 'max',
              S: 'min',
              TEsw: 'min',
              LEsw: 'min',
            },
            solve: this.funcs.ct[2],
          },
          3: {
            enbaled: true,
            vars: {
              cr: 'max',
              TR: 'max',
            },
            solve: this.funcs.ct[3],
          },
          4: {
            enbaled: false,
            vars: {
              cr: '',
              S: '',
              Sigma: '',
            },
            solve: this.funcs.ct[4],
          },
          5: {
            enbaled: false,
            vars: {
              cr: '',
              S: '',
              Vdiv: '',
            },
            solve: this.funcs.ct[5],
          },
          6: {
            enbaled: true,
            vars: {
              Afin: 'max',
              AR: 'min',
              TR: 'max',
            },
            solve: this.funcs.ct[6],
          },
        },
      },
      //Root Chord
      cr: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: {
              ct: 'min',
              S: 'min',
              Afin: 'max',
            },
            solve: this.funcs.cr[1],
          },
          2: {
            enbaled: true,
            vars: { ct: 'max', S: 'max', TEsw: 'max', LEsw: 'max' },
            solve: this.funcs.cr[2],
          },
          3: {
            enbaled: true,
            vars: { ct: 'max', TR: 'min' },
            solve: this.funcs.cr[3],
          },
          4: {
            enbaled: false,
            vars: { ct: '', S: '', Sigma: '' },
            solve: this.funcs.cr[4],
          },
          5: {
            enbaled: false,
            vars: { ct: '', S: '', Vdiv: '' },
            solve: this.funcs.cr[5],
          },
          6: {
            enbaled: true,
            vars: {
              Afin: 'max',
              AR: 'min',
              TR: 'min',
            },
            solve: this.funcs.cr[6],
          },
        },
      },
      // Span
      S: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { ct: 'min', cr: 'min', Afin: 'max' },
            solve: this.funcs.S[1],
          },
          2: {
            enbaled: true,
            vars: { ct: 'min', cr: 'max', LEsw: 'min', TEsw: 'min' },
            solve: this.funcs.S[2],
          },
          3: {
            enbaled: false,
            vars: { cr: '', ct: '', Sigma: '' },
            solve: this.funcs.S[3],
          },
          4: {
            enbaled: false,
            vars: { ct: '', cr: '', Vdiv: '' },
            solve: this.funcs.S[4],
          },
          5: {
            enbaled: true,
            vars: { AR: 'max', Afin: 'max' },
            solve: this.funcs.S[5],
          },
        },
      },
      // Aspect Raio
      AR: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { S: 'max', Afin: 'min' },
            solve: this.funcs.AR[1],
          },
          2: {
            enbaled: true,
            vars: { TR: 'min', LEsw: 'min', TEsw: 'min' },
            solve: this.funcs.AR[2],
          },
        },
      },
      // Taper Ratio
      TR: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { AR: 'min', LEsw: 'min', TEsw: 'min' },
            solve: this.funcs.TR[1],
          },
          3: {
            enbaled: true,
            vars: { ct: 'max', cr: 'min' },
            solve: this.funcs.TR[2],
          },
        },
      },
      // Area of Fin
      Afin: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { ct: 'max', cr: 'max', S: 'max' },
            solve: this.funcs.Afin[1],
          },
          2: {
            enbaled: true,
            vars: { AR: 'min', S: 'max' },
            solve: this.funcs.Afin[2],
          },
          3: {
            enbaled: true,
            vars: { m: 'max', t: 'min', Mat: 'val' },
            solve: this.funcs.Afin[3],
          },
          4: {
            enbaled: true,
            vars: {
              Cna: 'max',
              TR: 'min',
              AR: 'max',
              TEsw: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Afin[4],
          },
          4: {
            enbaled: true,
            vars: {
              Cna: 'max',
              TR: 'min',
              AR: 'max',
              LEsw: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Afin[5],
          },
        },
      },
      // Normal Lift Slope
      Cna: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: {
              Kn: 'max',
              Xfin: 'min',
              Xcog: 'max',
              CnaComp: 'min',
              Xcomp: 'min',
              Aref: 'max',
              N: 'min',
            },
            solve: this.funcs.Cna[1],
          },
          2: {
            enbaled: true,
            vars: {
              ct: 'max',
              cr: 'max',
              S: 'max',
              LEsw: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Cna[2],
          },
          3: {
            enbaled: true,
            vars: { Cn: 'max', AoA: 'min' },
            solve: this.funcs.Cna[3],
          },
        },
      },
      // Angle of Attack
      AoA: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cn: 'max', Cna: 'min' },
            solve: this.funcs.AoA[1],
          },
        },
      },
      // Normal Force Coefficient
      Cn: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { AoA: 'max', Cna: 'max' },
            solve: this.funcs.Cn[1],
          },
        },
      },
      // Tangential Force Coefficient
      Ct: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { AoA: 'max', Cta: 'max' },
            solve: this.funcs.Ct[1],
          },
        },
      },
      // Lift Force Coefficient
      Cl: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cn: 'max', Ct: 'max', AoA: 'max' },
            solve: this.funcs.Cl[1],
          },
        },
      },
      // Drag Force Coefficient
      Cd: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cn: 'max', Ct: 'max', AoA: 'max' },
            solve: this.funcs.Cd[1],
          },
        },
      },
      // Lift Force
      Fl: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cl: 'max', Aref: 'max', V: 'max', RowA: 'max' },
            solve: this.funcs.Fl[1],
          },
        },
      },
      // Drag Force
      Fd: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cd: 'max', Aref: 'max', V: 'max', RowA: 'max' },
            solve: this.funcs.Fd[1],
          },
        },
      },
      // Stress
      Sigma: {
        type: 'symetric',
        relations: {
          enbaled: false,
          1: {
            vars: { cr: '', ct: '', S: '', Cn: '', t: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: { cr: '', ct: '', LEsw: '', Cn: '', t: '' },
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: { cr: '', ct: '', TWsw: '', Cn: '', t: '' },
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: { cr: '', TWsw: '', LEsw: '', Cn: '', t: '' },
            solve: this.funcs.testfunc,
          },
          5: {
            enbaled: false,
            vars: { ct: '', TWsw: '', LEsw: '', Cn: '', t: '' },
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
            vars: { ct: '', cr: '', LEsw: '', S: '', Cn: '', Sigma: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: { ct: '', cr: '', TWsw: '', S: '', Cn: '', Sigma: '' },
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: { LEsw: '', cr: '', TWsw: '', S: '', Cn: '', Sigma: '' },
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: { LEsw: '', ct: '', TWsw: '', S: '', Cn: '', Sigma: '' },
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
            vars: { Sigma: '', t: '', cr: '', ct: '', LEsw: '', S: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: { Sigma: '', t: '', cr: '', ct: '', TWsw: '', S: '' },
            solve: this.funcs.testfunc,
          },
          3: {
            enbaled: false,
            vars: { Sigma: '', t: '', cr: '', LEsw: '', TWsw: '', S: '' },
            solve: this.funcs.testfunc,
          },
          4: {
            enbaled: false,
            vars: { Sigma: '', t: '', ct: '', LEsw: '', TEsw: '', S: '' },
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
            vars: { mT: 'max', N: 'min' },
            solve: this.funcs.m[1],
          },
          2: {
            enbaled: true,
            vars: { Afin: 'max', t: 'max', Mat: 'val' },
            solve: this.funcs.m[2],
          },
        },
      },
      // Total mass of fins in set
      mT: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { m: 'max', N: 'max' },
            solve: this.funcs.mT[1],
          },
        },
      },
      // Number of fins in set
      N: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { m: 'min', mT: 'max' },
            solve: this.funcs.N[1],
          },
        },
      },
      // Leading Edge Sweep
      LEsw: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { cr: 'max', ct: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.LEsw[1],
          },
          2: {
            enbaled: true,
            vars: { cr: 'max', TR: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.LEsw[2],
          },
          3: {
            enbaled: true,
            vars: { ct: 'min', TR: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.LEsw[3],
          },
        },
      },
      // Trailing Edge Sweep
      TEsw: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { cr: 'max', ct: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.TEsw[1],
          },
          2: {
            enbaled: true,
            vars: { cr: 'max', TR: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.TEsw[2],
          },
          3: {
            enbaled: true,
            vars: { ct: 'min', TR: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.TEsw[3],
          },
        },
      },
      // Axial Distance of fin set
      Xfin: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              Kn: 'max',
              CnaTot: 'min',
              Xcog: 'max',
              CnaComp: 'min',
              Xcomp: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Xfin[1],
          },
        },
      },
      // Static Stability Margin
      Kn: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              CnaTot: 'max',
              Xfin: 'max',
              CnaComp: 'max',
              Xcomp: 'max',
              Xcog: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Kn[1],
          },
          2: {
            enbaled: false,
            vars: { C1: '', V: '', Alt: '', Aref: '', Cna: '', CnaComp: '' },
            solve: this.funcs.Kn[2],
          },
        },
      },
      // Mach Number
      M: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { V: 'max', Ta: 'min', Alt: 'max' },
            solve: this.funcs.M[1],
          },
        },
      },
      // Velocity
      V: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { M: 'max', Ta: 'max', Alt: 'min' },
            solve: this.funcs.V[1],
          },
        },
      },
      // Dynamic C1 coefficient (0th order co-ef of 2nd order ODE)
      C1: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: false,
            vars: { Kn: '', V: '', Alt: '', Aref: '', CnaTot: '', CnaComp: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: { Wn: '', I: '' },
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
            vars: { C1: '', I: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enbaled: false,
            vars: {
              Tp: '',
            },
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
            vars: { C2a: '', C2p: '', C1: '', I: '' },
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
            vars: {
              Wn: 'max',
            },
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
            vars: { Cn: 'max', Aref: 'max', V: 'max', RowA: 'max' },
            solve: this.funcs.Fn[1],
          },
        },
      },
      // Tangential Force
      Ft: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Ct: 'max', Aref: 'max', V: 'max', RowA: 'max' },
            solve: this.funcs.Ft[1],
          },
        },
      },
      // Air density
      RowA: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Alt: 'min' },
            solve: this.funcs.RowA[1],
          },
        },
      },
      CnaTot: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cna: 'max', N: 'max' },
            solve: this.funcs.CnaTot[1],
          },
        },
      },
      CtaTot: {
        type: 'symetric',
        relations: {
          1: {
            enbaled: true,
            vars: { Cta: 'max', N: 'max' },
            solve: this.funcs.CtaTot[1],
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
