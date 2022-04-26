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
            enabled: true,
            vars: {
              cr: 'min',
              S: 'min',
              Afin: 'max',
            },
            solve: this.funcs.ct[1],
          },
          2: {
            enabled: true,
            vars: {
              cr: 'max',
              S: 'min',
              TEsw: 'min',
              LEsw: 'min',
            },
            solve: this.funcs.ct[2],
          },
          3: {
            enabled: true,
            vars: {
              cr: 'max',
              TR: 'max',
            },
            solve: this.funcs.ct[3],
          },
          4: {
            enabled: false,
            vars: {
              cr: '',
              S: '',
              Sigma: '',
            },
            solve: this.funcs.ct[4],
          },
          5: {
            enabled: false,
            vars: {
              cr: '',
              S: '',
              Vdiv: '',
            },
            solve: this.funcs.ct[5],
          },
          6: {
            enabled: true,
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
            enabled: true,
            vars: {
              ct: 'min',
              S: 'min',
              Afin: 'max',
            },
            solve: this.funcs.cr[1],
          },
          2: {
            enabled: true,
            vars: { ct: 'max', S: 'max', TEsw: 'max', LEsw: 'max' },
            solve: this.funcs.cr[2],
          },
          3: {
            enabled: true,
            vars: { ct: 'max', TR: 'min' },
            solve: this.funcs.cr[3],
          },
          4: {
            enabled: false,
            vars: { ct: '', S: '', Sigma: '' },
            solve: this.funcs.cr[4],
          },
          5: {
            enabled: false,
            vars: { ct: '', S: '', Vdiv: '' },
            solve: this.funcs.cr[5],
          },
          6: {
            enabled: true,
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
            enabled: true,
            vars: { ct: 'min', cr: 'min', Afin: 'max' },
            solve: this.funcs.S[1],
          },
          2: {
            enabled: true,
            vars: { ct: 'min', cr: 'max', LEsw: 'min', TEsw: 'min' },
            solve: this.funcs.S[2],
          },
          3: {
            enabled: false,
            vars: { cr: '', ct: '', Sigma: '' },
            solve: this.funcs.S[3],
          },
          4: {
            enabled: false,
            vars: { ct: '', cr: '', Vdiv: '' },
            solve: this.funcs.S[4],
          },
          5: {
            enabled: true,
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
            enabled: true,
            vars: { S: 'max', Afin: 'min' },
            solve: this.funcs.AR[1],
          },
          2: {
            enabled: true,
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
            enabled: true,
            vars: { AR: 'min', LEsw: 'min', TEsw: 'min' },
            solve: this.funcs.TR[1],
          },
          3: {
            enabled: true,
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
            enabled: true,
            vars: { ct: 'max', cr: 'max', S: 'max' },
            solve: this.funcs.Afin[1],
          },
          2: {
            enabled: true,
            vars: { AR: 'min', S: 'max' },
            solve: this.funcs.Afin[2],
          },
          3: {
            enabled: true,
            vars: { m: 'max', t: 'min', Mat: 'val' },
            solve: this.funcs.Afin[3],
          },
          4: {
            enabled: true,
            vars: {
              Cna: 'max',
              TR: 'min',
              AR: 'min',
              TEsw: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Afin[4],
          },
          5: {
            enabled: true,
            vars: {
              Cna: 'max',
              TR: 'min',
              AR: 'min',
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
            enabled: true,
            vars: {
              Kn: 'min',
              Xfin: 'max',
              XCog: 'min',
              CnaComp: 'max',
              Xcomp: 'max',
              Aref: 'min',
              N: 'min',
            },
            solve: this.funcs.Cna[1],
          },
          2: {
            enabled: true,
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
            enabled: true,
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
            enabled: true,
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
            enabled: true,
            vars: { AoA: 'max', Cna: 'max' },
            solve: this.funcs.Cn[1],
          },
          2: {
            enabled: true,
            vars: { RowA: 'max', Fn: 'max', V: 'max', Aref: 'max' },
            solve: this.funcs.Cn[2],
          },
        },
      },
      // Tangential Force Coefficient
      Ct: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              Aref: 'max',
              Ta: 'min', // Check
              Alt: 'min',
              M: 'max',
              Afin: 'max',
              t: 'max',
              Cbar: 'max',
              S: 'max',
              LEsw: 'min',
              TEsw: 'min',
              Msw: 'min',
              cr: 'max',
              AoA: 'max',
              Mat: 'val',
              Arf: 'val',
              Cn: 'max',
            },
            solve: this.funcs.Ct[1],
          },
        },
      },
      // Lift Force Coefficient
      Cl: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
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
            enabled: true,
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
            enabled: true,
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
            enabled: true,
            vars: { Cd: 'max', Aref: 'max', V: 'max', RowA: 'max' },
            solve: this.funcs.Fd[1],
          },
        },
      },
      // Thickness
      t: {
        type: 'symetric',
        relations: {
          1: {
            enabled: false,
            vars: { ct: '', cr: '', LEsw: '', S: '', Cn: '', Sigma: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enabled: false,
            vars: { ct: '', cr: '', TWsw: '', S: '', Cn: '', Sigma: '' },
            solve: this.funcs.testfunc,
          },
          3: {
            enabled: false,
            vars: { LEsw: '', cr: '', TWsw: '', S: '', Cn: '', Sigma: '' },
            solve: this.funcs.testfunc,
          },
          4: {
            enabled: false,
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
            enabled: false,
            vars: { Sigma: '', t: '', cr: '', ct: '', LEsw: '', S: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enabled: false,
            vars: { Sigma: '', t: '', cr: '', ct: '', TWsw: '', S: '' },
            solve: this.funcs.testfunc,
          },
          3: {
            enabled: false,
            vars: { Sigma: '', t: '', cr: '', LEsw: '', TWsw: '', S: '' },
            solve: this.funcs.testfunc,
          },
          4: {
            enabled: false,
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
            enabled: true,
            vars: { mT: 'max', N: 'min' },
            solve: this.funcs.m[1],
          },
          2: {
            enabled: true,
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
            enabled: true,
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
            enabled: true,
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
            enabled: true,
            vars: { cr: 'max', ct: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.LEsw[1],
          },
          2: {
            enabled: true,
            vars: { cr: 'max', TR: 'min', TEsw: 'min', S: 'min' },
            solve: this.funcs.LEsw[2],
          },
          3: {
            enabled: true,
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
            enabled: true,
            vars: { cr: 'max', ct: 'min', LEsw: 'min', S: 'min' },
            solve: this.funcs.TEsw[1],
          },
          2: {
            enabled: true,
            vars: { cr: 'max', TR: 'min', LEsw: 'min', S: 'min' },
            solve: this.funcs.TEsw[2],
          },
          3: {
            enabled: true,
            vars: { ct: 'min', TR: 'min', LEsw: 'min', S: 'min' },
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
              XCog: 'max',
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
              XCog: 'min',
              Aref: 'max',
            },
            solve: this.funcs.Kn[1],
          },
          2: {
            enabled: false,
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
            enabled: true,
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
            enabled: true,
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
            enabled: false,
            vars: { Kn: '', V: '', Alt: '', Aref: '', CnaTot: '', CnaComp: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enabled: false,
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
            enabled: false,
            vars: { C1: '', I: '' },
            solve: this.funcs.testfunc,
          },
          2: {
            enabled: false,
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
            enabled: false,
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
            enabled: false,
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
            enabled: true,
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
            enabled: true,
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
            enabled: true,
            vars: { Alt: 'min' },
            solve: this.funcs.RowA[1],
          },
        },
      },
      CnaTot: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: { Cna: 'max', N: 'max' },
            solve: this.funcs.CnaTot[1],
          },
        },
      },
      Cbar: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: { cr: 'max', ct: 'max' },
            solve: this.funcs.Cbar[1],
          },
        },
      },
      Msw: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: { cr: 'min', ct: 'max', S: 'max', LEsw: 'max' },
            solve: this.funcs.Msw[1],
          },
        },
      },
      Sigma: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              cr: 'max',
              Fn: 'max',
              Afin: 'max',
              TEsw: 'max',
              LEsw: 'max',
              S: 'max',
              t: 'min',
            },
            solve: this.funcs.Sigma[1],
          },
        },
      },
      Dref: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              Aref: 'max',
            },
            solve: this.funcs.Dref[1],
          },
        },
      },
      Aref: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              Dref: 'max',
            },
            solve: this.funcs.Aref[1],
          },
        },
      },
      v: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              cr: 'max',
              Fn: 'max',
              Afin: 'max',
              TEsw: 'max',
              LEsw: 'max',
              S: 'max',
              Mat: 'val',
              t: 'min',
            },
            solve: this.funcs.v[1],
          },
        },
      },
      Vcr: {
        type: 'symetric',
        relations: {
          1: {
            enabled: true,
            vars: {
              cr: 'max',
              t: 'max',
              TR: 'max',
              AR: 'max',
              Ta: 'min',
              Alt: 'min',
              Mat: 'val',
            },
            solve: this.funcs.Vcr[1],
          },
        },
      },
    };
  }
  addFiredFields() {
    for (const [propName, entry] of Object.entries(this.rules)) {
      for (const [relationKey, relation] of Object.entries(entry.relations)) {
        console.log(`${propName}: ${relationKey}`);
        relation.fired = false;
        relation.mirrorFired = false;
      }
    }
  }
}

// *** TO ADD
//*TangentialSlope - 7
//*Critical Flutter - 27
//*Divergence Velocity - 28
