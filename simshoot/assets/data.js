window.SIMSHOOT_GALLERY = {
  "b1_adapters": [
    {
      "adapter_id": "cam_orbit",
      "adapter_label": "Camera Orbit",
      "cases": [
        {
          "case_id": "02973",
          "track_label": "Targeted",
          "round_label": "Round 1",
          "headline": "Raising camera elevation to rebalance seated perspective",
          "summary": "Raising the viewpoint from road level to chest height requires 3D perspective synthesis; our cam_orbit LoRA elevates cleanly while pretrained H3 produces virtually no viewpoint change.",
          "failure_tag": "Native H3 Failure: No Viewpoint Shift",
          "action_id": "camera.orbit_elevation(direction=higher)",
          "input_img": "assets/media/img/2af0dfe74b6be1e6ca09-w760.jpg",
          "input_note": "Starting frame F0 for Round 1. Identical prompt and noise schedule are passed to both simulators.",
          "lora_video": "assets/media/vid/24ebc0e4f32c06a175ca.mp4",
          "vanilla_video": "assets/media/vid/04a343188ab9553e7110.mp4",
          "lora_badge": "Accepted (F19)",
          "vanilla_badge": "Rejected (F0)",
          "lora_note": "Visibly raises camera elevation to reduce foreground boot dominance while keeping the subject's arms, smile, and hillside consistent.",
          "vanilla_note": "Fails to raise the camera viewpoint across all 39 frames."
        }
      ]
    },
    {
      "adapter_id": "cam_translate",
      "adapter_label": "Camera Translate",
      "cases": [
        {
          "case_id": "00800",
          "track_label": "Open-ended",
          "round_label": "Round 1",
          "headline": "Reframing the subject horizontally toward image-left along the boardwalk",
          "summary": "Our cam_translate LoRA executes a smooth horizontal reframe (camera.reframe_x) toward image-left, opening clean water margin past her raised elbow while keeping her face, parted lips, and hands steady (accepted at F12); pretrained H3 shifts less and introduces off-target mouth and hand drift (rejected, F0 kept).",
          "failure_tag": "Native H3 Failure: Weak Shift & Pose/Expression Drift",
          "action_id": "camera.reframe_x(direction=image_left)",
          "input_img": "assets/media/img/145aea2f5b245cc6fa4f-w760.jpg",
          "input_note": "Starting frame F0 for Round 1. Identical prompt and noise schedule are passed to both simulators.",
          "lora_video": "assets/media/vid/df0570554d8f67806d29.mp4",
          "vanilla_video": "assets/media/vid/f94bafd36a9c4b156303.mp4",
          "lora_badge": "Accepted (F12)",
          "vanilla_badge": "Rejected (F0)",
          "lora_note": "Cleanly reframes the subject toward image-left to give the raised elbow breathing room while keeping her face, expression, peace sign, and phone hand intact (F12).",
          "vanilla_note": "Produces weaker leftward shift while altering her lips/expression and lowering the phone-holding hand—rejected by the Selector (F0)."
        }
      ]
    },
    {
      "adapter_id": "cam_zoom",
      "adapter_label": "Camera Zoom",
      "cases": [
        {
          "case_id": "05418",
          "track_label": "Open-ended",
          "round_label": "Round 1",
          "headline": "Smooth optical zoom-in for an intimate upper-body portrait",
          "summary": "Our cam_zoom LoRA produces a calibrated optical push-in with clean intermediate framing options, keeping the white shoulder flower and braid intact; pretrained H3 zooms slowly and inconsistently.",
          "failure_tag": "Native H3 Failure: Weak / Sluggish Extent",
          "action_id": "camera.zoom(direction=in)",
          "input_img": "assets/media/img/18264022d8addf7ee1bb-w760.jpg",
          "input_note": "Starting frame F0 for Round 1. Identical prompt and noise schedule are passed to both simulators.",
          "lora_video": "assets/media/vid/e26ec985548dc61d08a5.mp4",
          "vanilla_video": "assets/media/vid/aab8daf2cb5d4436865f.mp4",
          "lora_badge": "Accepted (F15)",
          "vanilla_badge": "Accepted (F38)",
          "lora_note": "Smooth, centered focal-length push-in providing crisp intermediate framing while keeping the shoulder flower intact.",
          "vanilla_note": "Weak zoom progression with sluggish framing response across the 39 frames."
        }
      ]
    },
    {
      "adapter_id": "cam_dof",
      "adapter_label": "Depth of Field",
      "cases": [
        {
          "case_id": "05367",
          "track_label": "Open-ended",
          "round_label": "Round 3",
          "headline": "Progressively opening aperture for optical background bokeh (Round 3)",
          "summary": "Both branches execute camera.aperture(direction=wider) in Round 3. Our cam_dof LoRA smoothly softens the bright woodland foliage and distant trunks while keeping her face, hat, and brooch sharp (accepted at F38); pretrained H3 leaves the background largely unchanged and is rejected twice in a row (R3/R4 not_performed, F0 kept).",
          "failure_tag": "Native H3 Failure: Optical Defocus Ignored",
          "action_id": "camera.aperture(direction=wider)",
          "input_img": "assets/media/img/3e84466bf9da6882a346-w760.jpg",
          "input_note": "Both branches execute the same camera.aperture(direction=wider) primitive at Round 3.",
          "lora_video": "assets/media/vid/712acd9474c249b1ca33.mp4",
          "vanilla_video": "assets/media/vid/1b00eba02aa9525cc8cc.mp4",
          "lora_badge": "Accepted (F38)",
          "vanilla_badge": "Rejected (F0)",
          "lora_note": "Cleanly increases optical background bokeh across the rollout while keeping facial features, hat, and brooch sharp (accepted F38).",
          "vanilla_note": "Leaves woodland foliage nearly unchanged across all 39 frames—rejected as not_performed in both Round 3 and its Round 4 retry (F0)."
        }
      ]
    },
    {
      "adapter_id": "pose",
      "adapter_label": "Pose",
      "cases": [
        {
          "case_id": "03321",
          "track_label": "Open-ended",
          "round_label": "Round 1",
          "headline": "Resting the right hand naturally into the trouser pocket",
          "summary": "SimShoot's pose LoRA cleanly moves the right hand into the visible pocket with natural wrist articulation while locking the stance, sunglasses, and wall; pretrained H3 ignores the request and stays static.",
          "failure_tag": "Native H3 Failure: Action Ignored",
          "action_id": "pose.open(\"The person rests their own right hand inside the visible right trouser pocket with the thumb outside, keeping the right elbow close to its current position and the other arm unchanged.\")",
          "input_img": "assets/media/img/c9a6bc83cc58da72fb23-w760.jpg",
          "input_note": "Starting frame F0 for Round 1. Identical prompt and noise schedule are passed to both simulators.",
          "lora_video": "assets/media/vid/f9f3b59000f794bfa7f4.mp4",
          "vanilla_video": "assets/media/vid/75c4cc51205fc71fab8e.mp4",
          "lora_badge": "Accepted (F29)",
          "vanilla_badge": "Rejected (F0)",
          "lora_note": "Smoothly guides the right hand into the pocket while preserving facial sharpness, scarf, jacket, and background masonry.",
          "vanilla_note": "No visible hand displacement across all 39 frames."
        }
      ]
    },
    {
      "adapter_id": "expression",
      "adapter_label": "Expression",
      "cases": [
        {
          "case_id": "03975",
          "track_label": "Targeted",
          "round_label": "Round 1",
          "headline": "Redirecting eye gaze toward the yellow flowers without turning the head",
          "summary": "The action explicitly isolates eye gaze while locking head pose. Our expression LoRA redirects both eyes cleanly; pretrained H3 entangles gaze with unwanted head rotation.",
          "failure_tag": "Native H3 Failure: Off-Target Head Turn",
          "action_id": "expression.gaze_target(gaze_target=image_right)",
          "input_img": "assets/media/img/6fef5249076dbb37a659-w760.jpg",
          "input_note": "Starting frame F0 for Round 1. Identical prompt and noise schedule are passed to both simulators.",
          "lora_video": "assets/media/vid/f42257d9d175916535d1.mp4",
          "vanilla_video": "assets/media/vid/42cc68241762506e078b.mp4",
          "lora_badge": "Accepted (F19)",
          "vanilla_badge": "Accepted (F22)",
          "lora_note": "Shifts eye gaze smoothly toward image-right while holding head angle, nose alignment, lips, and garden framing steady.",
          "vanilla_note": "Rotates the head and nose along with the eyes, violating the fixed-head preservation constraint."
        }
      ]
    },
    {
      "adapter_id": "light",
      "adapter_label": "Lighting",
      "cases": [
        {
          "case_id": "05456",
          "track_label": "Open-ended",
          "round_label": "Round 1",
          "headline": "Coherently warming color temperature across complexion and bar ambience",
          "summary": "In Round 1, both branches run light.color_temperature(direction=warmer). Our lighting LoRA warms both her cool-cast complexion and the ambient bar illumination smoothly and coherently (accepted at F19) while locking pose and cocktail glass; pretrained H3 warms the background slower (leaving the window frame cooler) and introduces slight downward glass and head drift.",
          "failure_tag": "Native H3 Failure: Slower Ambient Warming & Slight Pose Drift",
          "action_id": "light.color_temperature(direction=warmer)",
          "input_img": "assets/media/img/f09dc6c312ada96f3cbc-w760.jpg",
          "input_note": "Starting frame F0 for Round 1. Identical prompt and noise schedule are passed to both simulators.",
          "lora_video": "assets/media/vid/eb1a3a379e179069cc57.mp4",
          "vanilla_video": "assets/media/vid/62f00eb0abf6d94db6ce.mp4",
          "lora_badge": "Accepted (F19)",
          "vanilla_badge": "Accepted (F29)",
          "lora_note": "Smoothly warms both complexion and surrounding bar illumination by F19 while keeping pose, gaze, expression, and cocktail glass completely steady.",
          "vanilla_note": "Warms skin more slowly (needing F29) while leaving the window frame cooler and introducing slight downward cocktail-glass and late head drift."
        }
      ]
    }
  ],
  "b2_cases": [
    {
      "case_id": "01839",
      "track_label": "Targeted",
      "round_label": "R02",
      "adapter_label": "Camera Zoom",
      "short_label": "Zoom Out · Shoulder Margin",
      "headline": "Pinpointing exact zoom-out margin without excessive widening",
      "summary": "Terminal frame F38 over-widens the garden scene and shrinks facial presence. SimShoot inspects the coarse 5-frame sheet, opens the F10–F19 interval, and selects F12—giving the right shoulder comfortable breathing room while preserving portrait intimacy.",
      "action_id": "camera.zoom(direction=out)",
      "selected_label": "F12",
      "refine_bracket": "F10–F19",
      "input_img": "assets/media/img/59d3a357f27cc75e844e-w880.jpg",
      "f38_img": "assets/media/img/d8fdc4ec0dc6ec1770ee-w880.jpg",
      "selected_img": "assets/media/img/bc3be79313626a13f3a2-w880.jpg",
      "f38_note": "Forced terminal F38 zooms out much further than needed, shrinking the subject's face and altering visual balance.",
      "ours_note": "Refining F10–F19 pinpoints F12: clean breathing room around the shoulder and left eaves while preserving facial sharpness and natural hands.",
      "coarse_frames": [
        {
          "label": "F0",
          "src": "assets/media/img/59d3a357f27cc75e844e-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F10",
          "src": "assets/media/img/fed1373207b57c6569ac-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F19",
          "src": "assets/media/img/d5a3086982bb8ebf284a-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F29",
          "src": "assets/media/img/5b23c0e4819f56a2bf75-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F38",
          "src": "assets/media/img/d8fdc4ec0dc6ec1770ee-w460.jpg",
          "in_bracket": false
        }
      ],
      "refine_frames": [
        {
          "label": "F10",
          "src": "assets/media/img/fed1373207b57c6569ac-w460.jpg"
        },
        {
          "label": "F12",
          "src": "assets/media/img/bc3be79313626a13f3a2-w460.jpg"
        },
        {
          "label": "F15",
          "src": "assets/media/img/3b2dedf3fa584df9e2f8-w460.jpg"
        },
        {
          "label": "F17",
          "src": "assets/media/img/0beb2190cccae61622ad-w460.jpg"
        },
        {
          "label": "F19",
          "src": "assets/media/img/d5a3086982bb8ebf284a-w460.jpg"
        }
      ]
    },
    {
      "case_id": "05139",
      "track_label": "Open-ended",
      "round_label": "R02",
      "adapter_label": "Lighting",
      "short_label": "Night Fill · Balanced Facial Light",
      "headline": "Lifting facial shadow contrast without washing out night atmosphere",
      "summary": "Terminal frame F38 pushes facial brightening too far into a pale, flattened look. SimShoot evaluates the coarse candidates and interior interval to choose F29, balancing readable facial shadows with authentic nighttime depth.",
      "action_id": "light.key_flatten()",
      "selected_label": "F29",
      "refine_bracket": "F10–F19",
      "input_img": "assets/media/img/34ac6d7eda5be6ef8a9e-w880.jpg",
      "f38_img": "assets/media/img/e3142d6584ae85177836-w880.jpg",
      "selected_img": "assets/media/img/be2246d1558b558a621e-w880.jpg",
      "f38_note": "Forced terminal F38 over-brightens the face into a paler, flattened tone that breaks the natural evening contrast.",
      "ours_note": "SimShoot selects F29: both eyes and smile read clearly with intrusive cheek shadow lifted, while retaining natural evening modeling.",
      "coarse_frames": [
        {
          "label": "F0",
          "src": "assets/media/img/34ac6d7eda5be6ef8a9e-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F10",
          "src": "assets/media/img/3e33baf063f6ccb46b43-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F19",
          "src": "assets/media/img/d018a04906ac61b13fba-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F29",
          "src": "assets/media/img/be2246d1558b558a621e-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F38",
          "src": "assets/media/img/e3142d6584ae85177836-w460.jpg",
          "in_bracket": false
        }
      ],
      "refine_frames": [
        {
          "label": "F10",
          "src": "assets/media/img/3e33baf063f6ccb46b43-w460.jpg"
        },
        {
          "label": "F12",
          "src": "assets/media/img/d44e9b6289805310d871-w460.jpg"
        },
        {
          "label": "F15",
          "src": "assets/media/img/d84c9e6bae81f39755e3-w460.jpg"
        },
        {
          "label": "F17",
          "src": "assets/media/img/757cde8a7ffb2ffe9bd3-w460.jpg"
        },
        {
          "label": "F19",
          "src": "assets/media/img/d018a04906ac61b13fba-w460.jpg"
        }
      ]
    },
    {
      "case_id": "01080",
      "track_label": "Targeted",
      "round_label": "R03",
      "adapter_label": "Camera Orbit",
      "short_label": "Camera Orbit · Clear Wall Fixture",
      "headline": "Orbiting just enough to move the wall security camera off the crown",
      "summary": "Terminal frame F38 swings the camera too far around, distorting perspective and subject angle. SimShoot brackets F10–F19 and refines to F17—cleanly separating the white wall camera from behind the head with minimal viewpoint distortion.",
      "action_id": "camera.orbit_azimuth(direction=clockwise_from_above)",
      "selected_label": "F17",
      "refine_bracket": "F10–F19",
      "input_img": "assets/media/img/89fe09a7e2def7e3845a-w880.jpg",
      "f38_img": "assets/media/img/517a7a818a5c2beb7cd1-w880.jpg",
      "selected_img": "assets/media/img/1a93ab48be1f6852e971-w880.jpg",
      "f38_note": "Forced terminal F38 over-orbits the scene, introducing an excessive viewpoint swing well beyond what is needed to clear the fixture.",
      "ours_note": "Opening F10–F19 pinpoints F17: the wall-mounted camera moves cleanly left of the head while keeping gaze, hand-to-cheek contact, and subject scale intact.",
      "coarse_frames": [
        {
          "label": "F0",
          "src": "assets/media/img/89fe09a7e2def7e3845a-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F10",
          "src": "assets/media/img/8df8ec57100b5251cf9f-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F19",
          "src": "assets/media/img/4495222cccca71bee30b-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F29",
          "src": "assets/media/img/4bfdfe594906a0d4e819-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F38",
          "src": "assets/media/img/517a7a818a5c2beb7cd1-w460.jpg",
          "in_bracket": false
        }
      ],
      "refine_frames": [
        {
          "label": "F10",
          "src": "assets/media/img/8df8ec57100b5251cf9f-w460.jpg"
        },
        {
          "label": "F12",
          "src": "assets/media/img/fbe2c381f2d35c1a2120-w460.jpg"
        },
        {
          "label": "F15",
          "src": "assets/media/img/416bc595d27db805b35f-w460.jpg"
        },
        {
          "label": "F17",
          "src": "assets/media/img/1a93ab48be1f6852e971-w460.jpg"
        },
        {
          "label": "F19",
          "src": "assets/media/img/4495222cccca71bee30b-w460.jpg"
        }
      ]
    },
    {
      "case_id": "05236",
      "track_label": "Targeted",
      "round_label": "R01",
      "adapter_label": "Expression",
      "short_label": "Expression · Subtle Lip Parting",
      "headline": "Controlling micro-expression extent for a natural narrow lip opening",
      "summary": "Terminal frame F38 overshoots into a wider mouth opening than requested. SimShoot narrows down to F10–F19 and selects F17, delivering an exact subtle lip separation while keeping gaze, sparklers, and facial identity steady.",
      "action_id": "expression.open(\"The person parts the lips slightly into a narrow natural opening, keeping the mouth corners, jaw position, cheeks, eyes, and gaze unchanged.\")",
      "selected_label": "F17",
      "refine_bracket": "F10–F19",
      "input_img": "assets/media/img/9372243573b76f08ac0c-w880.jpg",
      "f38_img": "assets/media/img/5a37c6df71c08d87fb6c-w880.jpg",
      "selected_img": "assets/media/img/5e834011908388453bf1-w880.jpg",
      "f38_note": "Forced terminal F38 overshoots into a noticeably wider mouth opening, breaking the subtle, quiet expression requested by the prompt.",
      "ours_note": "Refining F10–F19 pinpoints F17: a restrained, natural narrow lip parting with zero jaw shift, exposed teeth, or gaze drift.",
      "coarse_frames": [
        {
          "label": "F0",
          "src": "assets/media/img/9372243573b76f08ac0c-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F10",
          "src": "assets/media/img/7bf053a3b80d479d4429-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F19",
          "src": "assets/media/img/e1386d9bbb296b865455-w460.jpg",
          "in_bracket": true
        },
        {
          "label": "F29",
          "src": "assets/media/img/fbdcf1d5b2d356c2fa24-w460.jpg",
          "in_bracket": false
        },
        {
          "label": "F38",
          "src": "assets/media/img/5a37c6df71c08d87fb6c-w460.jpg",
          "in_bracket": false
        }
      ],
      "refine_frames": [
        {
          "label": "F10",
          "src": "assets/media/img/7bf053a3b80d479d4429-w460.jpg"
        },
        {
          "label": "F12",
          "src": "assets/media/img/3d84ee30be1c54ddd871-w460.jpg"
        },
        {
          "label": "F15",
          "src": "assets/media/img/b17c0157cf78577f5fcb-w460.jpg"
        },
        {
          "label": "F17",
          "src": "assets/media/img/5e834011908388453bf1-w460.jpg"
        },
        {
          "label": "F19",
          "src": "assets/media/img/e1386d9bbb296b865455-w460.jpg"
        }
      ]
    }
  ],
  "b3_cases": [
    {
      "case_id": "05189",
      "track_label": "Open-ended",
      "benefit_group": "adapt",
      "benefit_label": "Benefit I · Dynamic Plan Adaptation",
      "short_label": "05189 · Emergent DoF Polish",
      "headline": "Adding an emergent aperture action after inspecting Round 1",
      "summary": "After the shared Round-1 zoom brings the subject and yellow leaves closer, the pre-committed fixed list stops immediately. Observing the tighter crop, SimShoot's adaptive Planner recognizes the busy autumn ground directly behind the hands and dynamically adds camera.aperture(wider) to create clean subject-background separation.",
      "case_note": "Observe how Fixed stops right after the shared Round-1 zoom, while SimShoot inspects the tighter crop and adds camera.aperture(wider) in Round 2 to soften the busy autumn ground.",
      "initial_plan": [
        {
          "index": 1,
          "family": "camera",
          "label": "zoom",
          "action": "camera.zoom(direction=in)"
        }
      ],
      "fixed_tag": "Static 1-step queue · stops after zoom",
      "ours_tag": "Appends emergent aperture step after inspecting S1",
      "input_img": "assets/media/img/eeae99c81ae689649f52-w760.jpg",
      "feedback_final": "assets/media/img/01bcae9637d883c505c9-w760.jpg",
      "fixed_final": "assets/media/img/e8f4ace42909e32dcf43-w760.jpg",
      "feedback_summary": "2 accepted edits (zoom → emergent aperture)",
      "fixed_summary": "1 accepted edit (stopped after zoom)",
      "feedback_stats": "2/2 accepted",
      "fixed_stats": "1/1 accepted",
      "feedback_steps": [
        {
          "round_label": "Round 1",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F5",
          "action_short": "camera.zoom(direction=in)",
          "note": "F5 provides a small but visible improvement in facial presence while keeping the leaf-holding story readable. Its face close-up retains sharp …",
          "img": "assets/media/img/e8f4ace42909e32dcf43-w540.jpg",
          "video": "assets/media/vid/32dd9432ffb56d5fbda2.mp4",
          "planner_reason": "A tighter crop directly addresses the excess space above her and should make her face more prominent. The selector can keep a frame that strengthens the portrait while preserving the hands and leaves.",
          "action_full": "camera.zoom(direction=in)",
          "plan_queue": [
            {
              "status": "pending",
              "label": "zoom"
            }
          ],
          "change_label": "Shared Step 1",
          "change_kind": "neutral",
          "change_desc": "Same starting zoom as Fixed."
        },
        {
          "round_label": "Round 2",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F29",
          "action_short": "camera.aperture(direction=wider)",
          "note": "F29 gives the face and cupped leaves clear visual priority without sacrificing the setting's texture. The face close-up preserves her identity…",
          "img": "assets/media/img/01bcae9637d883c505c9-w540.jpg",
          "video": "assets/media/vid/6f62b68d184159e73c87.mp4",
          "planner_reason": "The framing correction is complete, and the pose, expression, viewpoint, and lighting already serve the portrait. Background detail is the remaining concrete distraction, so a moderate aperture adjustment is the appropriate final edit.",
          "action_full": "camera.aperture(direction=wider)",
          "plan_queue": [
            {
              "status": "done",
              "label": "zoom"
            },
            {
              "status": "pending",
              "label": "aperture"
            }
          ],
          "change_label": "+ Added Emergent Step",
          "change_kind": "added",
          "change_desc": "Inspecting tighter crop S1, Planner spots busy autumn ground behind the hands and dynamically adds camera.aperture(wider)."
        }
      ],
      "fixed_steps": [
        {
          "round_label": "Round 1",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F5",
          "action_short": "camera.zoom(direction=in)",
          "note": "F5 provides a small but visible improvement in facial presence while keeping the leaf-holding story readable. Its face close-up retains sharp …",
          "img": "assets/media/img/e8f4ace42909e32dcf43-w540.jpg",
          "video": "assets/media/vid/32dd9432ffb56d5fbda2.mp4",
          "planner_reason": "A tighter crop directly addresses the excess space above her and should make her face more prominent. The selector can keep a frame that strengthens the portrait while preserving the hands and leaves.",
          "action_full": "camera.zoom(direction=in)",
          "plan_queue": [
            {
              "status": "pending",
              "label": "zoom"
            }
          ],
          "change_label": "Pre-committed Step 1",
          "change_kind": "neutral",
          "change_desc": "Executes initial planned zoom."
        },
        {
          "round_label": "Round 2",
          "accepted": false,
          "is_stop": true,
          "badge": "Stop",
          "action_short": "planner_stop (terminate)",
          "note": "Planner verifies the current portrait and voluntarily terminates.",
          "img": null,
          "video": null,
          "planner_reason": "The precommitted list is exhausted.",
          "action_full": "planner_stop (terminate)",
          "plan_queue": [
            {
              "status": "done",
              "label": "zoom"
            }
          ],
          "change_label": "Queue Exhausted → Stop",
          "change_kind": "muted",
          "change_desc": "Pre-committed list has no further steps; stops immediately."
        }
      ]
    },
    {
      "case_id": "05570",
      "track_label": "Open-ended",
      "benefit_group": "adapt",
      "benefit_label": "Benefit I · Dynamic Plan Adaptation",
      "short_label": "05570 · Revised Action Sequence",
      "headline": "Revising the planned action sequence after observing the Round-1 smile",
      "summary": "The pre-committed fixed plan follows the Round-1 smile with fill lighting alone. After seeing the warm smile in S1, SimShoot's adaptive Planner re-evaluates the spatial balance between the portrait and the architectural mural behind her, switching to camera.zoom(in) followed by camera.aperture(wider) for a markedly stronger composition.",
      "case_note": "Observe how Fixed only follows the smile with fill lighting, whereas SimShoot inserts camera.zoom(in) after Round 1 and later drops stalled fill lighting to pivot to camera.aperture(wider).",
      "initial_plan": [
        {
          "index": 1,
          "family": "expression",
          "label": "smile",
          "action": "expression.open(\"The person forms a closed-lip smile.\")"
        },
        {
          "index": 2,
          "family": "light",
          "label": "fill light",
          "action": "light.fill(direction=stronger)"
        }
      ],
      "fixed_tag": "Static 2-step queue · smile → fill light",
      "ours_tag": "Inserts zoom after S1; drops stalled light & pivots to aperture",
      "input_img": "assets/media/img/161f020ab17edd7e5802-w760.jpg",
      "feedback_final": "assets/media/img/4d0871e5d742df1c0797-w760.jpg",
      "fixed_final": "assets/media/img/b477dae997b3fef7593e-w760.jpg",
      "feedback_summary": "3 accepted edits (smile → zoom → aperture)",
      "fixed_summary": "2 accepted edits (smile → fill light)",
      "feedback_stats": "3/5 accepted",
      "fixed_stats": "2/3 accepted",
      "feedback_steps": [
        {
          "round_label": "Round 1",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "expression.closed_lip_smile()",
          "note": "F19 provides the best balance of warmth and restraint: the smile is clearly visible without looking forced or overly broad, and her reserved n…",
          "img": "assets/media/img/f8cefd23336274c7218e-w540.jpg",
          "video": "assets/media/vid/05ade948437b981e0a7f.mp4",
          "planner_reason": "The reserved expression is the clearest opportunity to make this already well-framed portrait feel more welcoming, and a closed-lip smile is a reliable, restrained adjustment.",
          "action_full": "expression.closed_lip_smile()",
          "plan_queue": [
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Shared Step 1",
          "change_kind": "neutral",
          "change_desc": "Same starting smile as Fixed."
        },
        {
          "round_label": "Round 2",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "camera.zoom(direction=in)",
          "note": "F19 provides the strongest visible composition improvement in the available sheet: the face is more prominent and the overhead space is reduce…",
          "img": "assets/media/img/7eb54fc6464ae4f31fc6-w540.jpg",
          "video": "assets/media/vid/387c5c699081141ee1ed.mp4",
          "planner_reason": "The smile is resolved, and a tighter composition offers a clear improvement without changing her natural pose. Making the face larger before the lighting edit also gives the following round more facial detail to preserve.",
          "action_full": "camera.zoom(direction=in)",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "zoom"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "+ Inserted Zoom Before Lighting",
          "change_kind": "added",
          "change_desc": "Seeing S1, Planner judges overhead mural still competes with the face and inserts camera.zoom(in) before lighting."
        },
        {
          "round_label": "Round 3",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (not_performed) → F0",
          "action_short": "light.fill(direction=stronger)",
          "note": "None of the generated frames provides a clear photographic improvement over CURRENT or visibly achieves the requested modest shadow lift. The …",
          "img": "assets/media/img/7eb54fc6464ae4f31fc6-w540.jpg",
          "video": "assets/media/vid/ecd6c138580b19de8fa4.mp4",
          "planner_reason": "The expression and composition are now successful. Moderate fill directly addresses the remaining imbalance between the two sides of her face and offers a useful final improvement while preserving the photograph's natural daylight character.",
          "action_full": "light.fill(direction=stronger)",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "done",
              "label": "zoom"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Resumes Planned Step (Fill Light)",
          "change_kind": "neutral",
          "change_desc": "Attempts fill light on the tighter portrait; rejected."
        },
        {
          "round_label": "Round 4",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (not_performed) → F0",
          "action_short": "light.fill(direction=stronger) + retry_note",
          "note": "Keep CURRENT because none of the generated frames visibly improves the balance between the two eyes or reveals additional shadow detail. The c…",
          "img": "assets/media/img/7eb54fc6464ae4f31fc6-w540.jpg",
          "video": "assets/media/vid/254331c8f0aced1d92ea.mp4",
          "planner_reason": "The prior video held the existing lighting with only minor tonal fluctuation, leaving the face's shadow imbalance unresolved. Retry the fill adjustment because a modest lift would improve facial readability without changing the portrait's mood.",
          "action_full": "light.fill(direction=stronger)+note(\"The image-left eye and cheek are still distinctly darker, with their shadow detail modestly lifted while image-right brightness stays unchanged.\")",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "done",
              "label": "zoom"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "↻ Retry with Explicit Shadow Note",
          "change_kind": "rewritten",
          "change_desc": "Adds explicit note lifting shaded left eye/cheek while locking right-side highlights; still rejected."
        },
        {
          "round_label": "Round 5",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F38",
          "action_short": "camera.aperture(direction=wider)",
          "note": "F38 offers the strongest visible improvement in background separation without taking the blur too far. Rechecking its face close-up against CU…",
          "img": "assets/media/img/4d0871e5d742df1c0797-w540.jpg",
          "video": "assets/media/vid/4d23b2d35ac95b2d8429.mp4",
          "planner_reason": "The accepted expression and framing already work, and the lighting step has exhausted its two attempts. Background detail remains a concrete distraction that an available action can address. Aperture is the appropriate final edit because it can strengthen attention on her face without changing her pose or the scene.",
          "action_full": "camera.aperture(direction=wider)",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "done",
              "label": "zoom"
            },
            {
              "status": "dropped",
              "label": "fill light"
            },
            {
              "status": "pending",
              "label": "aperture"
            }
          ],
          "change_label": "⇄ Dropped Stalled Light → Added Aperture",
          "change_kind": "pivoted",
          "change_desc": "Drops exhausted lighting step and pivots to camera.aperture(wider) to quiet sharp background lines."
        }
      ],
      "fixed_steps": [
        {
          "round_label": "Round 1",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "expression.closed_lip_smile()",
          "note": "F19 provides the best balance of warmth and restraint: the smile is clearly visible without looking forced or overly broad, and her reserved n…",
          "img": "assets/media/img/f8cefd23336274c7218e-w540.jpg",
          "video": "assets/media/vid/05ade948437b981e0a7f.mp4",
          "planner_reason": "The reserved expression is the clearest opportunity to make this already well-framed portrait feel more welcoming, and a closed-lip smile is a reliable, restrained adjustment.",
          "action_full": "expression.closed_lip_smile()",
          "plan_queue": [
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Pre-committed Step 1",
          "change_kind": "neutral",
          "change_desc": "Executes initial planned closed-lip smile."
        },
        {
          "round_label": "Round 2",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (not_performed) → F0",
          "action_short": "light.fill(direction=stronger)",
          "note": "Keep CURRENT because none of the generated frames offers a visible improvement in facial light balance. They preserve the previous round's wel…",
          "img": "assets/media/img/f8cefd23336274c7218e-w540.jpg",
          "video": "assets/media/vid/5036440b633c708bd203.mp4",
          "planner_reason": "Execute precommitted step 2, attempt 1.",
          "action_full": "light.fill(direction=stronger)",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Pre-committed Step 2 (Attempt 1)",
          "change_kind": "neutral",
          "change_desc": "Executes fixed fill light; rejected (no visible lift)."
        },
        {
          "round_label": "Round 3",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F29",
          "action_short": "light.fill(direction=stronger)",
          "note": "F29 provides the best moderate fill: the shadow side has useful detail and the facial contrast is softened, yet the image-right highlight, fac…",
          "img": "assets/media/img/b477dae997b3fef7593e-w540.jpg",
          "video": "assets/media/vid/982feca60a91f4cc8da7.mp4",
          "planner_reason": "Execute precommitted step 2, attempt 2.",
          "action_full": "light.fill(direction=stronger)",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Blind Retry of Step 2",
          "change_kind": "neutral",
          "change_desc": "Repeats unchanged fill light prompt without replanning."
        },
        {
          "round_label": "Round 4",
          "accepted": false,
          "is_stop": true,
          "badge": "Stop",
          "action_short": "planner_stop (terminate)",
          "note": "Planner verifies the current portrait and voluntarily terminates.",
          "img": null,
          "video": null,
          "planner_reason": "The precommitted list is exhausted.",
          "action_full": "planner_stop (terminate)",
          "plan_queue": [
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "done",
              "label": "fill light"
            }
          ],
          "change_label": "Queue Exhausted → Stop",
          "change_kind": "muted",
          "change_desc": "Pre-committed list ends; framing & background left untouched."
        }
      ]
    },
    {
      "case_id": "05581",
      "track_label": "Open-ended",
      "benefit_group": "robust",
      "benefit_label": "Benefit II · Failure Resilience & Efficiency",
      "short_label": "05581 · Recovering from Failure",
      "headline": "Diagnosing unintended expression drift and rewriting into open-vocabulary pose constraints",
      "summary": "In Round 1, the closed-set primitive pose.arm_rest_side(side=right) causes unintended mouth/expression distortion and is rejected (F0). Observing this exact failure, SimShoot's adaptive Planner switches in Round 2 to an open-vocabulary pose.open(...) explicitly locking the original lips and pout—succeeding immediately and proceeding to smile and bokeh polish—whereas the fixed sequence repeats the closed-set primitive twice, fails both times, and leaves the raised arm unresolved.",
      "case_note": "Observe how Fixed blindly repeats the failing closed-set pose primitive twice and leaves the raised arm unfixed, whereas SimShoot diagnoses Round 1's mouth drift and rewrites it into an open-vocabulary pose constraint that succeeds immediately.",
      "initial_plan": [
        {
          "index": 1,
          "family": "pose",
          "label": "lower arm",
          "action": "pose.open(\"The person brings their own right arm into a relaxed position beside the torso with the hand …\")"
        },
        {
          "index": 2,
          "family": "expression",
          "label": "smile",
          "action": "expression.open(\"The person forms a small closed-lip smile with gently meeting lips while keeping both eyes di…\")"
        },
        {
          "index": 3,
          "family": "light",
          "label": "fill light",
          "action": "light.fill(direction=stronger)"
        }
      ],
      "fixed_tag": "Repeats failed pose 2× → drops pose, arm stays raised",
      "ours_tag": "Diagnoses mouth drift & rewrites pose; pivots to aperture",
      "input_img": "assets/media/img/5577b8287eb8c33b58a9-w760.jpg",
      "feedback_final": "assets/media/img/4321267bce8ca941f40f-w760.jpg",
      "fixed_final": "assets/media/img/67d245bef9474a73d504-w760.jpg",
      "feedback_summary": "3 accepted edits (rewrote failed pose → smile → aperture)",
      "fixed_summary": "Arm pose failed 2×; skipped to smile & fill light",
      "feedback_stats": "3/7 accepted",
      "fixed_stats": "2/4 accepted",
      "feedback_steps": [
        {
          "round_label": "Round 1",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (worse) → F0",
          "action_short": "pose.arm_rest_side(side=right)",
          "note": "F38 offers the strongest composition and completes the arm adjustment, but its expression change is facial drift and therefore fails the accep…",
          "img": "assets/media/img/5577b8287eb8c33b58a9-w540.jpg",
          "video": "assets/media/vid/4d20fdb1d96c2c47ad2f.mp4",
          "planner_reason": "The raised arm is the strongest visible source of postural tension, and a simple arm adjustment is likely to work reliably. Establishing the body pose first also allows the next round to judge the expression in its final context.",
          "action_full": "pose.arm_rest_side(side=right)",
          "plan_queue": [
            {
              "status": "pending",
              "label": "lower arm"
            },
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Shared Step 1",
          "change_kind": "neutral",
          "change_desc": "Same closed-set pose.arm_rest_side fails due to mouth drift → rejected."
        },
        {
          "round_label": "Round 2",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F38",
          "action_short": "pose.open(\"The person brings their own right arm into a relaxed position beside t…",
          "note": "F38 gives the most settled version of the requested pose: the raised sleeve no longer competes with the face, and the shoulder looks comfortab…",
          "img": "assets/media/img/4c8ac397f88192046e0c-w540.jpg",
          "video": "assets/media/vid/79f5089992284f43ae25.mp4",
          "planner_reason": "The first video demonstrated that lowering the arm can improve the composition, but an unrelated mouth change prevented acceptance. This retry targets that specific failure while completing the pose adjustment before the planned expression and lighting edits.",
          "action_full": "pose.open(\"The person brings their own right arm into a relaxed position beside the torso with the hand below the waist, keeping the lips pushed forward in the original pout, the gaze at the camera, and the head and other arm unchanged.\")",
          "plan_queue": [
            {
              "status": "pending",
              "label": "lower arm"
            },
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "↻ Rewrote Primitive → Open-Vocab Pose",
          "change_kind": "rewritten",
          "change_desc": "Diagnoses R1 mouth drift; switches to pose.open(...) explicitly locking original pout & gaze → arm lowered cleanly!"
        },
        {
          "round_label": "Round 3",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F29",
          "action_short": "expression.closed_lip_smile()",
          "note": "F29 offers the most natural, welcoming expression while retaining the subject's playful character. Its smile visibly improves on CURRENT and c…",
          "img": "assets/media/img/4573bcb1cc673577129c-w540.jpg",
          "video": "assets/media/vid/5b00d963fda0b8bd22a5.mp4",
          "planner_reason": "The successful pose adjustment makes the held pout the clearest remaining source of stiffness. A restrained closed-lip smile is a reliable expression change and should be established before refining the facial lighting.",
          "action_full": "expression.closed_lip_smile()",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower arm"
            },
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Continues to Planned Smile",
          "change_kind": "neutral",
          "change_desc": "With relaxed posture settled, executes closed-lip smile."
        },
        {
          "round_label": "Round 4",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (wrong_action) → F0",
          "action_short": "light.fill(direction=stronger)",
          "note": "Keep CURRENT: none of the generated frames provides a clear photographic improvement through the requested shadow fill. The early change is of…",
          "img": "assets/media/img/4573bcb1cc673577129c-w540.jpg",
          "video": "assets/media/vid/142929f6ce69999e0095.mp4",
          "planner_reason": "The pose and expression are now successful, but facial shadows still reduce the person's visual prominence. A restrained fill adjustment directly addresses that remaining weakness while preserving the composition and festive atmosphere.",
          "action_full": "light.fill(direction=stronger)",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower arm"
            },
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Attempts Planned Fill Light",
          "change_kind": "neutral",
          "change_desc": "Fill light shifts warm highlights instead of shadows → rejected."
        },
        {
          "round_label": "Round 5",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (wrong_action) → F0",
          "action_short": "light.fill(direction=stronger) + retry_note",
          "note": "Keep CURRENT. F10 offers no clear photographic improvement, and subsequent frames strengthen highlights more than shadow detail, missing the r…",
          "img": "assets/media/img/4573bcb1cc673577129c-w540.jpg",
          "video": "assets/media/vid/47e84ad1e0a3f1fffcbb.mp4",
          "planner_reason": "The accepted pose and expression already work. Facial shadow visibility is the remaining actionable weakness, and the required retry directly addresses the previous video's incorrect increase in warm directional highlights.",
          "action_full": "light.fill(direction=stronger)+note(\"The eye sockets and shaded cheeks are brighter with lower facial contrast, while existing cheek highlights, warm color, background, smile and gaze remain unchanged.\")",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower arm"
            },
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "↻ Retry with Explicit Contrast Note",
          "change_kind": "rewritten",
          "change_desc": "Adds explicit note protecting warm highlights/smile while lifting shadows; still rejected."
        },
        {
          "round_label": "Round 6",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (not_performed) → F0",
          "action_short": "camera.aperture(direction=wider)",
          "note": "No generated frame provides a visible photographic improvement over CURRENT. The distracting background details remain similarly defined throu…",
          "img": "assets/media/img/4573bcb1cc673577129c-w540.jpg",
          "video": "assets/media/vid/56dcc08df49deeeda62d.mp4",
          "planner_reason": "The pose and expression are resolved, and the unsuccessful fill step is exhausted. Moderate optical background softening addresses a separate visible distraction without requiring a new viewpoint or invented surroundings, and it belongs last in the session.",
          "action_full": "camera.aperture(direction=wider)",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower arm"
            },
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "dropped",
              "label": "fill light"
            },
            {
              "status": "pending",
              "label": "aperture"
            }
          ],
          "change_label": "⇄ Dropped Light → Added Aperture",
          "change_kind": "pivoted",
          "change_desc": "Drops exhausted fill light and adds camera.aperture(wider) to soften rear plates/shelves."
        },
        {
          "round_label": "Round 7",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F38",
          "action_short": "camera.aperture(direction=wider) + retry_note",
          "note": "F38 provides the clearest subject separation without obscuring the environmental context. The face close-up retains sharp eyes and mouth, reco…",
          "img": "assets/media/img/4321267bce8ca941f40f-w540.jpg",
          "video": "assets/media/vid/652b2995dc8d46d11d3b.mp4",
          "planner_reason": "Background competition remains a concrete weakness after the successful pose and expression edits. The first aperture attempt held everything stable but did not deliver visible separation, so one explicit retry is warranted as the final planned adjustment.",
          "action_full": "camera.aperture(direction=wider)+note(\"The rear plates, faucet and shelves are visibly out of focus, while the eyes, face, hair and sweater remain sharp.\")",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower arm"
            },
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "dropped",
              "label": "fill light"
            },
            {
              "status": "pending",
              "label": "aperture"
            }
          ],
          "change_label": "↻ Aperture Retry with Focus Note",
          "change_kind": "rewritten",
          "change_desc": "Adds explicit note keeping eyes/face/sweater sharp while blurring rear dishes → accepted!"
        }
      ],
      "fixed_steps": [
        {
          "round_label": "Round 1",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (worse) → F0",
          "action_short": "pose.arm_rest_side(side=right)",
          "note": "F38 offers the strongest composition and completes the arm adjustment, but its expression change is facial drift and therefore fails the accep…",
          "img": "assets/media/img/5577b8287eb8c33b58a9-w540.jpg",
          "video": "assets/media/vid/4d20fdb1d96c2c47ad2f.mp4",
          "planner_reason": "The raised arm is the strongest visible source of postural tension, and a simple arm adjustment is likely to work reliably. Establishing the body pose first also allows the next round to judge the expression in its final context.",
          "action_full": "pose.arm_rest_side(side=right)",
          "plan_queue": [
            {
              "status": "pending",
              "label": "lower arm"
            },
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Pre-committed Step 1 (Attempt 1)",
          "change_kind": "neutral",
          "change_desc": "Closed-set pose.arm_rest_side causes unintended mouth drift → rejected."
        },
        {
          "round_label": "Round 2",
          "accepted": false,
          "is_stop": false,
          "badge": "Rejected (worse) → F0",
          "action_short": "pose.arm_rest_side(side=right)",
          "note": "The later frames offer a more comfortable shoulder line, but their preservation drift touches the face: they change the expression that this s…",
          "img": "assets/media/img/5577b8287eb8c33b58a9-w540.jpg",
          "video": "assets/media/vid/368ab5c80108de2aa3a7.mp4",
          "planner_reason": "Execute precommitted step 1, attempt 2.",
          "action_full": "pose.arm_rest_side(side=right)",
          "plan_queue": [
            {
              "status": "pending",
              "label": "lower arm"
            },
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Blind Repeat of Exact Same Primitive",
          "change_kind": "warn",
          "change_desc": "Repeats identical pose.arm_rest_side without fixing mouth drift → rejected again & dropped!"
        },
        {
          "round_label": "Round 3",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F29",
          "action_short": "expression.open(\"The person forms a small closed-lip smile with gently meeting li…",
          "note": "F29 gives the portrait a warmer, more relaxed expression while retaining the person's playful character and recognizable facial features. The …",
          "img": "assets/media/img/96ecb03ab426ce274bab-w540.jpg",
          "video": "assets/media/vid/addc4a8cf84b515f4f15.mp4",
          "planner_reason": "Execute precommitted step 2, attempt 1.",
          "action_full": "expression.open(\"The person forms a small closed-lip smile with gently meeting lips while keeping both eyes directed at the camera.\")",
          "plan_queue": [
            {
              "status": "dropped",
              "label": "lower arm"
            },
            {
              "status": "pending",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Pre-committed Step 2 (Arm Unresolved)",
          "change_kind": "neutral",
          "change_desc": "Moves on to smile while the raised sleeve/arm remains unfixed."
        },
        {
          "round_label": "Round 4",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "light.fill(direction=stronger)",
          "note": "F19 gives the face a visible but restrained lift, making the eyes and cheeks easier to read while preserving sharp facial features, natural mo…",
          "img": "assets/media/img/67d245bef9474a73d504-w540.jpg",
          "video": "assets/media/vid/8b48d98f2d4dadb60328.mp4",
          "planner_reason": "Execute precommitted step 3, attempt 1.",
          "action_full": "light.fill(direction=stronger)",
          "plan_queue": [
            {
              "status": "dropped",
              "label": "lower arm"
            },
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "pending",
              "label": "fill light"
            }
          ],
          "change_label": "Pre-committed Step 3",
          "change_kind": "neutral",
          "change_desc": "Executes fixed fill light."
        },
        {
          "round_label": "Round 5",
          "accepted": false,
          "is_stop": true,
          "badge": "Stop",
          "action_short": "planner_stop (terminate)",
          "note": "Planner verifies the current portrait and voluntarily terminates.",
          "img": null,
          "video": null,
          "planner_reason": "The precommitted list is exhausted.",
          "action_full": "planner_stop (terminate)",
          "plan_queue": [
            {
              "status": "dropped",
              "label": "lower arm"
            },
            {
              "status": "done",
              "label": "smile"
            },
            {
              "status": "done",
              "label": "fill light"
            }
          ],
          "change_label": "Queue Exhausted → Stop",
          "change_kind": "muted",
          "change_desc": "Terminates with original postural tension unresolved."
        }
      ]
    },
    {
      "case_id": "00680",
      "track_label": "Targeted",
      "benefit_group": "robust",
      "benefit_label": "Benefit II · Failure Resilience & Efficiency",
      "short_label": "00680 · Avoiding Redundant Edits",
      "headline": "Detecting an already-satisfied smile and stopping early to prevent over-editing",
      "summary": "While executing the first two pose edits (lowering the cup to chest height and turning the head upright), the subject naturally settles into a soft closed-lip smile. SimShoot inspects S2, recognizes that all requested edits are already satisfied, and stops cleanly—whereas the fixed plan blindly runs its pre-committed Round-3 expression edit, producing a noticeably stiffer smile.",
      "case_note": "Observe how SimShoot detects that Round 1 already softened the lips into a subtle smile, rewrites Round 2 to preserve it, and stops early after Round 2—avoiding Fixed's redundant Round-3 smile edit.",
      "initial_plan": [
        {
          "index": 1,
          "family": "pose",
          "label": "lower cup",
          "action": "pose.open(\"The person lowers their own right forearm until the cup rim is at mid-chest height, keeping t…\")"
        },
        {
          "index": 2,
          "family": "pose",
          "label": "turn head",
          "action": "pose.open(\"The person turns their head to face the camera, keeping the existing chin height, head tilt, …\")"
        },
        {
          "index": 3,
          "family": "expression",
          "label": "smile",
          "action": "expression.open(\"The person brings their lips gently together with both mouth corners slightly raised in a sub…\")"
        }
      ],
      "fixed_tag": "Blindly executes all 3 steps → redundant extra smile",
      "ours_tag": "Detects smile already met in S1 → rewrites R2 & stops early",
      "input_img": "assets/media/img/dd7e3a1ed07a1ed27693-w760.jpg",
      "feedback_final": "assets/media/img/69494896d95940bb6643-w760.jpg",
      "fixed_final": "assets/media/img/974ca32e4a95e63f532b-w760.jpg",
      "feedback_summary": "2 edits → voluntary early stop (natural smile preserved)",
      "fixed_summary": "3 edits (redundant extra smile round → stiffer mouth)",
      "feedback_stats": "2/2 accepted",
      "fixed_stats": "3/3 accepted",
      "feedback_steps": [
        {
          "round_label": "Round 1",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "pose.open(\"The person lowers their own right forearm until the cup rim is at mid-…",
          "note": "F19 reaches the requested cup height with a natural upright hold and grip. It is a visible photographic improvement, and the subtle face and e…",
          "img": "assets/media/img/6d8255cdff3bbc5eee13-w540.jpg",
          "video": "assets/media/vid/0727583e8c587981c707.mp4",
          "planner_reason": "Establishing the requested cup height first lets the subsequent head turn preserve a settled hand position, with only a small localized pose change and no changes to the camera or scene.",
          "action_full": "pose.open(\"The person lowers their own right forearm until the cup rim is at mid-chest height, keeping the cup upright in the same grip and the head, torso, and left arm unchanged.\")",
          "plan_queue": [
            {
              "status": "pending",
              "label": "lower cup"
            },
            {
              "status": "pending",
              "label": "turn head"
            },
            {
              "status": "pending",
              "label": "smile"
            }
          ],
          "change_label": "Shared Step 1",
          "change_kind": "neutral",
          "change_desc": "Lowers right forearm & cup to mid-chest height (mouth also settles gently)."
        },
        {
          "round_label": "Round 2",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F29",
          "action_short": "pose.open(\"The person brings the head upright to face the camera directly, keepin…",
          "note": "F29 completes the requested turn with an engaged, natural expression and sharp eyes and mouth. Its close-up preserves recognizable facial stru…",
          "img": "assets/media/img/69494896d95940bb6643-w540.jpg",
          "video": "assets/media/vid/d6e9d6c7cbf7c50cb432.mp4",
          "planner_reason": "The head orientation is the only requested adjustment still incomplete. A focused head turn offers a clear improvement while preserving the cup height and slight smile already achieved.",
          "action_full": "pose.open(\"The person brings the head upright to face the camera directly, keeping the torso still, the cup upright at chest height in their own right hand, and the slight closed-lip smile unchanged.\")",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower cup"
            },
            {
              "status": "pending",
              "label": "turn head"
            },
            {
              "status": "done",
              "label": "smile"
            }
          ],
          "change_label": "✓ Step 3 Already Met · Rewrote R2 & Stopped Early",
          "change_kind": "rewritten",
          "change_desc": "Detects a soft smile already formed in S1; marks Step 3 done, rewrites R2 to preserve it, and terminates after R2—skipping Fixed's redundant R3."
        },
        {
          "round_label": "Round 3",
          "accepted": false,
          "is_stop": true,
          "badge": "Stop",
          "action_short": "planner_stop (terminate)",
          "note": "Planner verifies the current portrait and voluntarily terminates.",
          "img": null,
          "video": null,
          "planner_reason": "CURRENT satisfies all three authorized edits. Further changes offer no necessary improvement and would increase the risk of facial texture loss, identity drift, or alteration of properties the user explicitly asked to preserve.",
          "action_full": "planner_stop (terminate)",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower cup"
            },
            {
              "status": "done",
              "label": "turn head"
            },
            {
              "status": "done",
              "label": "smile"
            }
          ],
          "change_label": "⏹ Voluntary Early Stop (Skipped Step 3)",
          "change_kind": "stopped",
          "change_desc": "Verifies all 3 user goals are satisfied in S2; stops early to prevent over-editing and facial texture drift."
        }
      ],
      "fixed_steps": [
        {
          "round_label": "Round 1",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "pose.open(\"The person lowers their own right forearm until the cup rim is at mid-…",
          "note": "F19 reaches the requested cup height with a natural upright hold and grip. It is a visible photographic improvement, and the subtle face and e…",
          "img": "assets/media/img/6d8255cdff3bbc5eee13-w540.jpg",
          "video": "assets/media/vid/0727583e8c587981c707.mp4",
          "planner_reason": "Establishing the requested cup height first lets the subsequent head turn preserve a settled hand position, with only a small localized pose change and no changes to the camera or scene.",
          "action_full": "pose.open(\"The person lowers their own right forearm until the cup rim is at mid-chest height, keeping the cup upright in the same grip and the head, torso, and left arm unchanged.\")",
          "plan_queue": [
            {
              "status": "pending",
              "label": "lower cup"
            },
            {
              "status": "pending",
              "label": "turn head"
            },
            {
              "status": "pending",
              "label": "smile"
            }
          ],
          "change_label": "Pre-committed Step 1",
          "change_kind": "neutral",
          "change_desc": "Lowers right forearm & cup to mid-chest height."
        },
        {
          "round_label": "Round 2",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "pose.open(\"The person turns their head to face the camera, keeping the existing c…",
          "note": "F19 delivers the requested camera-facing portrait with a natural expression and clear facial detail while most closely preserving the existing…",
          "img": "assets/media/img/3561c3bfbfbb89957abc-w540.jpg",
          "video": "assets/media/vid/42f770cd119e21c326bd.mp4",
          "planner_reason": "Execute precommitted step 2, attempt 1.",
          "action_full": "pose.open(\"The person turns their head to face the camera, keeping the existing chin height, head tilt, parted lips, torso position, and both arms unchanged, with the upright cup in their own right hand at mid-chest height.\")",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower cup"
            },
            {
              "status": "pending",
              "label": "turn head"
            },
            {
              "status": "pending",
              "label": "smile"
            }
          ],
          "change_label": "Pre-committed Step 2 (Stale Prompt)",
          "change_kind": "warn",
          "change_desc": "Uses stale pre-written prompt referencing 'parted lips' despite S1's softer mouth."
        },
        {
          "round_label": "Round 3",
          "accepted": true,
          "is_stop": false,
          "badge": "Accepted · F19",
          "action_short": "expression.open(\"The person brings their lips gently together with both mouth cor…",
          "note": "F19 provides the best balance: the lips are clearly closed and the mouth corners are gently raised, while the expression remains natural and s…",
          "img": "assets/media/img/974ca32e4a95e63f532b-w540.jpg",
          "video": "assets/media/vid/2dd9e59893a22b60d82e.mp4",
          "planner_reason": "Execute precommitted step 3, attempt 1.",
          "action_full": "expression.open(\"The person brings their lips gently together with both mouth corners slightly raised in a subtle, natural closed-lip smile, keeping the eyes, gaze, brows, and head position unchanged.\")",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower cup"
            },
            {
              "status": "done",
              "label": "turn head"
            },
            {
              "status": "pending",
              "label": "smile"
            }
          ],
          "change_label": "Redundant Pre-committed Step 3",
          "change_kind": "warn",
          "change_desc": "Blindly runs planned smile edit on an already-smiling face → stiffer mouth."
        },
        {
          "round_label": "Round 4",
          "accepted": false,
          "is_stop": true,
          "badge": "Stop",
          "action_short": "planner_stop (terminate)",
          "note": "Planner verifies the current portrait and voluntarily terminates.",
          "img": null,
          "video": null,
          "planner_reason": "All precommitted steps are accepted, carried as fallback, or spent.",
          "action_full": "planner_stop (terminate)",
          "plan_queue": [
            {
              "status": "done",
              "label": "lower cup"
            },
            {
              "status": "done",
              "label": "turn head"
            },
            {
              "status": "done",
              "label": "smile"
            }
          ],
          "change_label": "Queue Exhausted → Stop",
          "change_kind": "muted",
          "change_desc": "All 3 fixed steps executed."
        }
      ]
    }
  ],
  "b4a_cases": [
    {
      "case_id": "01563",
      "track_label": "Targeted (Pilot)",
      "round_label": "R01",
      "adapter_label": "Body Pose",
      "headline": "Lowering the right hand to the knee while locking the raised left arm",
      "summary": "Watch the three portraits animate simultaneously from 0% to 100%: SimShoot glides the right arm smoothly downward while keeping the raised left arm frozen; FLUX 3 jumps straight to the knee at F10 and jitters in place; Qwen-Image 2.1 drops the raised left arm (violating the preservation constraint) and is rejected.",
      "action_id": "pose.open(\"The person rests their own right hand naturally on their own right knee with relaxed fingers, keeping their own left arm raised and their head, torso, and seated legs unchanged.\")",
      "h3_rank": "Strict Monotonic Progression",
      "qwen_rank": "Off-Target Drift → Rejected",
      "prompts": {
        "h3": "A continuous shot starting from the input image. The person rests their own right hand naturally on their own right knee with relaxed fingers, keeping their own left arm raised and their head, torso, and seated legs unchanged. Keep the camera and scene fixed. Preserve the person's identity, clothing and all body parts unrelated to this action. The action progresses smoothly without cuts or additional actions.",
        "extents": {
          "F10": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The person rests their own right hand naturally on their own right knee with relaxed fingers, keeping their own left arm raised and their head, torso, and seated legs unchanged. Show an early, small but visible part of the action (26.3% of the full change from this input). Use the indicated fraction of the motion from the present body position to its described position. For a reach or contact, the limb follows that fraction of the remaining path toward the target. For a turn, use that fraction of the turn. Keep the camera and scene fixed. Preserve the person's identity, clothing and all body parts unrelated to this action. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing the first image while preserving the original sunset lakeside scene, camera position, framing, and warm orange light exactly as photographed. Keep the seated young man’s identity, short tousled black hair, downward head angle, white T-shirt, open white short-sleeve overshirt, black trousers, silver chain bracelet, dark wristwatch, seated torso, and both seated legs unchanged. Modify only his right arm: lower it from the raised position by 26.3% of the remaining path toward its resting position, so his right forearm descends naturally and his right hand rests lightly on his own right knee, with relaxed, separated fingers making only a small initial contact. Preserve the silver chain bracelet on that wrist. Keep his left arm raised exactly as in the source, with the left hand open and fingers spread, and leave the left wristwatch unchanged. Preserve the glowing sun, orange sky, layered mountains, distant shoreline, calm rippling water, reflections, buoys, poles, and rocks without alteration. Match the lowered right arm and hand to the existing sunset illumination, perspective, skin tone, and natural contact shadow on the black trouser-covered knee."
          },
          "F19": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The person rests their own right hand naturally on their own right knee with relaxed fingers, keeping their own left arm raised and their head, torso, and seated legs unchanged. Show the action exactly halfway toward its endpoint (50.0% of the full change from this input). Use the indicated fraction of the motion from the present body position to its described position. For a reach or contact, the limb follows that fraction of the remaining path toward the target. For a turn, use that fraction of the turn. Keep the camera and scene fixed. Preserve the person's identity, clothing and all body parts unrelated to this action. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing the first image only, preserving the seated young man’s exact identity, face, short dark hair, downward head angle, torso, seated legs, white T-shirt, open white short-sleeve overshirt, black trousers, silver chain bracelet, dark wristwatch, camera position, and sunset lakeside scene. Show the right arm halfway through the requested motion: from its current raised position, lower it by exactly 50% of the remaining distance so the man’s own right hand rests naturally on his own right knee, with the elbow midway down and the relaxed fingers making partial contact with the knee. The final endpoint is the right palm resting flat on the knee with relaxed fingers, so at the halfway point the right hand is halfway between the raised palm and that contact position. Keep the left arm raised exactly as photographed, with the left hand open and unchanged. Preserve the head, torso, clothing, seated-leg placement, and all other body parts unchanged. Keep the orange sun, glowing water reflection, distant mountains, shoreline, buoys, poles, and every background detail exactly fixed, with the original warm sunset light and perspective."
          },
          "F29": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The person rests their own right hand naturally on their own right knee with relaxed fingers, keeping their own left arm raised and their head, torso, and seated legs unchanged. Show a strong, nearly completed movement (76.3% of the full change from this input). Use the indicated fraction of the motion from the present body position to its described position. For a reach or contact, the limb follows that fraction of the remaining path toward the target. For a turn, use that fraction of the turn. Keep the camera and scene fixed. Preserve the person's identity, clothing and all body parts unrelated to this action. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing the first image while preserving the original camera position, sunset lake scene, framing, and all background details exactly as photographed. Keep the seated young man’s identity, short tousled black hair, downward head angle, white T-shirt, open white short-sleeve overshirt, black trousers, silver chain bracelet, dark wristwatch, seated torso, and both legs unchanged. Modify only his right arm so that his right hand now rests naturally on his own right knee, with relaxed, gently separated fingers making full contact with the black fabric. Show the arm at 76.3% of the remaining path from its raised position to this resting position, leaving only a small residual bend at the elbow and a subtle sense of the movement nearly completed. Keep his left arm raised exactly as in the source, with the open hand and wristwatch unchanged. Preserve the orange sunset, glowing reflection across the rippling water, distant mountains, shoreline, buoys, poles, and boat without alteration. Maintain the same warm backlighting, shadows, skin tone, clothing folds, and natural contact shadows where the right palm meets the knee."
          },
          "F38": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The person rests their own right hand naturally on their own right knee with relaxed fingers, keeping their own left arm raised and their head, torso, and seated legs unchanged. Show the action at its full natural endpoint (100%). Use the indicated fraction of the motion from the present body position to its described position. For a reach or contact, the limb follows that fraction of the remaining path toward the target. For a turn, use that fraction of the turn. Keep the camera and scene fixed. Preserve the person's identity, clothing and all body parts unrelated to this action. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing only the seated person’s right arm in the first image, preserving the original photograph as the canvas. Keep the young East Asian man’s exact identity, short tousled black hair, downward head angle, facial features, torso, seated position, black trousers, white T-shirt, open white short-sleeve overshirt, silver chain bracelet on his left wrist, dark wristwatch on his right wrist, and the entire lakeside sunset scene unchanged. Lower his right arm from its raised position so that his right hand now rests naturally on his own right knee, with the palm relaxed and all five fingers gently separated against the black fabric. Preserve the right wristwatch and natural wrist anatomy. Keep his left arm fully raised exactly as photographed, with the open left hand held outward at frame-left. Do not alter his head, torso, seated legs, clothing, or any other body part. Preserve the low camera position, the orange sun above the distant mountain ridge, the glowing reflection across the rippling water, the dark shoreline, floating buoys, vertical posts, and the small purple buoy. Match the lowered right arm to the existing sunset light, perspective, and body contact shadows."
          }
        }
      },
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "selected": "F38",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/d2465f1c5f9970e4fbc6-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/820ac22173cad5ecd128-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/be50f56927c53241295d-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/d878c9b172e3761c5b5a-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/474595f068aae092bfdc-w760.jpg"
            }
          ],
          "note": "Continuous, physically monotonic downward hand progression across F0→F38 with left arm and legs strictly locked."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "selected": "F19",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/d2465f1c5f9970e4fbc6-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/c0d52b72d4ad4b007f0a-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/f632380759e8195de47d-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/83e2c0dc9d2c77744b29-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/fdc13205237dd38f5a53-w760.jpg"
            }
          ],
          "note": "Extent prompts collapse toward the same endpoint pose across F10–F38, removing genuine intermediate gradation."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "selected": "F0",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/d2465f1c5f9970e4fbc6-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/a6781fef6651a6101f30-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/33d75302ed53601062ca-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/d58201ee4ab2ce940d39-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/a69074a940ed3818fdf6-w760.jpg"
            }
          ],
          "note": "Lowers the left arm that was required to stay raised and jitters across frames—Selector rejects the round (F0)."
        }
      ]
    },
    {
      "case_id": "05621",
      "track_label": "Open-ended",
      "round_label": "R05",
      "adapter_label": "Camera DoF",
      "headline": "Progressive aperture widening (background bokeh)",
      "summary": "SimShoot achieves perfect 6/6 monotonic bokeh progression from F10 to F38 while keeping the subject locked; Qwen-Image 2.1 reverses extent 5 out of 6 pairs (F29 sharper than F10!) with unstable re-rendering and is rejected (F0).",
      "action_id": "camera.aperture(direction=wider)",
      "h3_rank": "6/6 Ordered (0 Reversals)",
      "qwen_rank": "1/6 Ordered · 5 Reversals",
      "prompts": {
        "h3": "A continuous shot starting from the input image. The camera opens its aperture so the depth of field becomes shallower, keeping its position, orientation, focal length, focus distance and exposure fixed. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. The action progresses smoothly without cuts or additional actions.",
        "extents": {
          "F10": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera opens its aperture so the depth of field becomes shallower, keeping its position, orientation, focal length, focus distance and exposure fixed. Show an early, small but visible part of the action (26.3% of the full change from this input). Apply that fraction of the aperture change. Show the corresponding amount of background defocus or sharpening. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing the first image with only a 26.3% increase in aperture openness, producing a modest, corresponding reduction in background focus while keeping the camera position, orientation, focal length, focus distance, exposure, and all other controls fixed. Preserve the young East Asian woman exactly as photographed: her face, identity, warm smile, long dark hair, peach textured sweater, bright yellow knitted scarf, plaid shoulder bag, body position, and gaze toward the camera remain unchanged. Keep the foreground woman and her clothing fully defined and unchanged. Apply the aperture change only to the park background: soften the distant trees, lawn, blue sky, and white structure slightly more than in the original, with the nearest foliage and background becoming gently less distinct while retaining their recognizable forms and colors. The effect should remain subtle and visibly proportional to exactly 26.3% of the requested change, not a dramatic blur. Preserve the original sunlight direction, highlights, shadows, color balance, and exposure without alteration. Keep the woman, foreground yellow object at frame-left, and every other scene element still in precisely the same position and geometry."
          },
          "F19": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera opens its aperture so the depth of field becomes shallower, keeping its position, orientation, focal length, focus distance and exposure fixed. Show the action exactly halfway toward its endpoint (50.0% of the full change from this input). Apply that fraction of the aperture change. Show the corresponding amount of background defocus or sharpening. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph that preserves the first image exactly as the canvas while applying only a 50% aperture change toward a shallower depth of field. Keep the young East Asian woman’s identity, facial features, smile, gaze, head angle, body position, long dark hair, peach knit sweater, bright yellow scarf, plaid shoulder bag, and all foreground geometry unchanged. Preserve the original camera position, orientation, focal length, focus distance, exposure, and warm sunlight exactly. At the halfway point, soften the background only to an intermediate level: retain recognizable shapes and colors in the park, but reduce the fine detail and edge definition across the distant grass, trees, blue sky, and white structure by approximately half the amount that would appear at the full endpoint. The woman’s face and hair remain naturally defined, while the background becomes moderately softened, with the nearest tree trunks and foliage losing some detail and the far lawn, evergreen canopy, yellow leaves, and distant architecture becoming progressively less distinct. Do not alter the woman, her clothing, the foreground yellow object at frame-left, the composition, or the scene lighting; only the requested partial optical change is visible."
          },
          "F29": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera opens its aperture so the depth of field becomes shallower, keeping its position, orientation, focal length, focus distance and exposure fixed. Show a strong, nearly completed movement (76.3% of the full change from this input). Apply that fraction of the aperture change. Show the corresponding amount of background defocus or sharpening. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing the first image with a strong aperture change that produces a nearly completed shallow-depth-of-field effect, representing 76.3% of the full change from the current focus state. Keep the young East Asian woman exactly fixed in place, with her identity, facial geometry, near-frontal three-quarter head angle, direct gaze, open smile, long dark hair, peach knit sweater, bright yellow scarf, plaid shoulder bag, and all existing materials unchanged. Preserve the original camera position, orientation, focal length, focus distance, exposure, and warm sunlight. Keep her face and upper body fully sharp and unchanged. Apply the aperture change only to the park background: render the grass, trees, yellow foliage, blue sky, distant structures, and the large yellow foreground object at frame-left as progressively stronger, smooth optical defocus, with the background becoming a soft wash of green, yellow, blue, and brown shapes while retaining the original color relationships. The background blur should be nearly complete, with only minimal trace of the original tree detail remaining. Do not alter the woman’s pose, clothing, expression, scale, or placement, and do not change the scene lighting or any other element."
          },
          "F38": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera opens its aperture so the depth of field becomes shallower, keeping its position, orientation, focal length, focus distance and exposure fixed. Show the action at its full natural endpoint (100%). Apply that fraction of the aperture change. Show the corresponding amount of background defocus or sharpening. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing only the optical depth of field of the first image: open the camera aperture substantially so the background becomes strongly defocused while the focal plane remains fixed on the young woman. Preserve her exact position, scale, orientation, framing, focus distance, exposure, and identity, including her near-frontal three-quarter head angle, direct gaze, natural smile, long dark hair, peach textured sweater, bright yellow knitted scarf, and plaid shoulder bag. Keep every detail of her face, hair, clothing, and body geometry unchanged. Retain the same sunny park lighting and color balance, but render the entire background behind her as a smooth, natural optical blur: the green lawn, yellow and evergreen trees, blue sky, distant white structure, and foreground yellow object at frame-left dissolve into broad soft fields of green, yellow, brown, and blue with no recognizable background detail. Preserve the woman as the only sharply resolved subject, with no change to her illumination, shadows, skin texture, or clothing materials. Keep the camera position, orientation, focal length, focus distance, exposure, and all other scene content fixed; the only change is the requested aperture-driven background defocus."
          }
        }
      },
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "selected": "F29",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/5a14274c13ff64c9ff76-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/09ea5134bf8e6e00c5c5-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/d3c1b699de2dcf0ff647-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/5e0e2e9725bb68a74837-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/6da45a2905e3b64cc74e-w760.jpg"
            }
          ],
          "note": "Smooth, physically consistent bokeh ramp from F0→F38 with locked facial and clothing detail."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "selected": "F22",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/5a14274c13ff64c9ff76-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/1f98d6fb0948ab82315b-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/aec3280e81f8339a8284-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/f6eeee30f6307995a1b9-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/8bda71a5c442796a6259-w760.jpg"
            }
          ],
          "note": "Inconsistent blur strength and subtle re-synthesis texture shifts across independent extent prompts."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "selected": "F0",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/5a14274c13ff64c9ff76-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/971e561e5df4ebabe7a2-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/fd9132b16112a0289d61-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/c73faaa68c7ca14a971c-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/723f9668aeb1bba72565-w760.jpg"
            }
          ],
          "note": "Severe non-monotonic reversal (F29 < F38 < F19 < F10) and off-target shifts—rejected (F0)."
        }
      ]
    },
    {
      "case_id": "00076",
      "track_label": "Targeted",
      "round_label": "R03",
      "adapter_label": "Camera Orbit",
      "headline": "Continuous camera elevation orbit with stable dining scene",
      "summary": "3D camera orbit exposes the sharpest physical gap between video simulation and 2D image editing: SimShoot rotates the camera smoothly across all 4 positions (6/6 strictly ordered), whereas both FLUX 3 and Qwen-Image 2.1 fail to produce consistent perspective shifts and are rejected (F0).",
      "action_id": "camera.orbit_elevation(direction=lower)",
      "h3_rank": "6/6 Ordered (0 Reversals)",
      "qwen_rank": "3/6 Ordered · Rejected",
      "prompts": {
        "h3": "A continuous shot starting from the input image. The camera moves to a lower viewpoint while remaining aimed at the subject. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. The action progresses smoothly without cuts or additional actions.",
        "extents": {
          "F10": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera moves to a lower viewpoint while remaining aimed at the subject. Show an early, small but visible part of the action (26.3% of the full change from this input). Move the viewpoint through that fraction of the orbit angle in the specified direction, keeping the camera aimed at the subject. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same woman and café interior from a lower camera viewpoint, shifted by exactly 26.3% of a 360-degree orbit around her in the specified direction, with the orbit direction downward toward the subject so the camera remains aimed at her. Keep the viewpoint aimed directly at the woman while lowering it by roughly one quarter of a full orbit, producing a modest upward perspective from below her waist level. Preserve the woman exactly as photographed: her face, identity, gentle smile, straight black hair with bangs, pearl necklace, cream off-shoulder bow-front dress with voluminous sleeves, black shoulder strap, and metallic gold bag remain unchanged in position and geometry. Show slightly more of her lower torso and dress from the lower angle, with the foreground table and chairs appearing subtly larger and closer while the woman remains centered and still. Keep the café unchanged: the dark wood-paneled walls, tiled floor, wooden chairs, arched bar, staff, pendant lamp, draped cream fabric, and warm amber lighting retain their exact materials, placement, and illumination. Preserve the same framing logic and all scene content, changing only the camera position and the resulting perspective from the lower viewpoint."
          },
          "F19": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera moves to a lower viewpoint while remaining aimed at the subject. Show the action exactly halfway toward its endpoint (50.0% of the full change from this input). Move the viewpoint through that fraction of the orbit angle in the specified direction, keeping the camera aimed at the subject. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same woman and café interior from a camera position lowered halfway through a 50-degree upward orbit toward the subject, keeping the camera aimed directly at her. The viewpoint is now at approximately a 25-degree upward tilt from the original position, producing a natural low-angle perspective midway between the original eye level and the requested lower viewpoint. Keep the woman exactly still in the same pose, with her face, identity, fair skin, straight black hair and bangs, gentle smile, pearl necklace, cream off-shoulder bow-front dress with voluminous sleeves, black shoulder strap, and metallic gold bag unchanged. Preserve her hand positions and the exact placement of her body. Reveal slightly more of the lower portion of her dress and the tiled floor from below while the café geometry shifts naturally with the new perspective: the foreground table and chairs appear lower and more foreshortened, while the woman remains centered and unobstructed. Keep the dark wood-paneled walls, amber wall lighting, pendant lamp, draped cream fabric, arched bar, background staff, chairs, tables, flowers, and tiled floor fixed in their original positions and materials. Preserve the same warm café lighting, exposure, colors, and all scene details without alteration."
          },
          "F29": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera moves to a lower viewpoint while remaining aimed at the subject. Show a strong, nearly completed movement (76.3% of the full change from this input). Move the viewpoint through that fraction of the orbit angle in the specified direction, keeping the camera aimed at the subject. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same young East Asian woman from the first image, preserving her exact identity, face, gentle smile, straight black hair with wispy bangs, pearl necklace, cream off-the-shoulder bow-front dress, black shoulder strap, and metallic gold shoulder bag. Move the camera to a substantially lower viewpoint, completing 76.3% of the specified downward orbit while keeping its axis aimed directly at her face and body. The resulting viewpoint is close to floor level, looking upward toward her from below her waist, with her head and upper body rising prominently in the composition and her lower dress extending toward the foreground. Keep her pose and position in the café unchanged, but reveal more of the terracotta tile floor, the lower edge of her dress, and the foreground table and chair from below. Preserve the same café geometry and materials: the wooden wall paneling, tiled floor, wooden chairs, tables, arched bar, staff, pendant lamp, draped cream fabric, and ceiling ornament remain fixed in their original locations, only seen from the new low angle. Maintain the same warm amber interior lighting, exposure, colors, and natural shadows without altering any person, object, or background detail."
          },
          "F38": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera moves to a lower viewpoint while remaining aimed at the subject. Show the action at its full natural endpoint (100%). Move the viewpoint through that fraction of the orbit angle in the specified direction, keeping the camera aimed at the subject. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same young East Asian woman from the first image, preserving her exact identity, facial features, gentle smile, straight black hair with wispy bangs, pearl necklace, cream off-the-shoulder bow-front dress, black shoulder strap, and metallic gold shoulder bag. Move the camera to a distinctly lower viewpoint while keeping it aimed directly at her, as though the camera has orbited downward around her to a natural waist-level position. Show her from the same frontal stance but from below, with the lower viewpoint revealing more of her cream dress and the floor around her while her face remains fully visible and unobstructed. Keep her body and the entire café scene still in their original positions, now seen from below: the woman rises centrally against the same background, with the foreground table and chairs appearing lower and more foreshortened, and her face and upper body appearing slightly larger from the lower angle. Preserve the wooden paneled walls, tiled floor, arched bar, staff, pendant lamp, draped cream fabric, ceiling ornament, chairs, tables, flowers, and all materials exactly as photographed. Maintain the same warm amber café lighting, exposure, color balance, and natural shadows without changing any scene element."
          }
        }
      },
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "selected": "F24",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/eb163ce110a3d0fa6b83-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/53d3a6553a56edfc0766-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/29a26c2710cc11c62a08-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/774739b9b30e458e11a9-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/86674275cf2508f953da-w760.jpg"
            }
          ],
          "note": "Continuous 3D camera perspective shift across F0→F38 (refined and accepted at F24)."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "selected": "F0",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/eb163ce110a3d0fa6b83-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/38dbf52edeed8a6c07c0-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/17ecebc59b1400bcc012-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/9b4a91cd3c8c25ce7a4d-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/66fc143bd971e401e925-w760.jpg"
            }
          ],
          "note": "Fails to realize consistent 3D perspective change across extent levels—Selector rejects (F0)."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "selected": "F0",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/eb163ce110a3d0fa6b83-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/dc7b181b70c6f9a110ea-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/a87968ae6e3d2c2adb6b-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/266deb710e26a9d4d49f-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/2f59370b95ab477415db-w760.jpg"
            }
          ],
          "note": "Flat plateau across F19–F38 with inconsistent geometry—Selector rejects (F0)."
        }
      ]
    },
    {
      "case_id": "00209",
      "track_label": "Targeted",
      "round_label": "R04",
      "adapter_label": "Camera Zoom",
      "headline": "Calibrated optical zoom-in vs. non-monotonic scale jumping",
      "summary": "SimShoot executes a smooth, continuous optical zoom-in across F0→F38 (6/6 strictly ordered, refined to F15); Qwen-Image 2.1 reverses the requested scale order on 5 out of 6 pairs (F38 wider than F10!).",
      "action_id": "camera.zoom(direction=in)",
      "h3_rank": "6/6 Ordered (0 Reversals)",
      "qwen_rank": "1/6 Ordered · 5 Reversals",
      "prompts": {
        "h3": "A continuous shot starting from the input image. The camera zooms in by lengthening the focal length while keeping its position fixed. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. The action progresses smoothly without cuts or additional actions.",
        "extents": {
          "F10": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera zooms in by lengthening the focal length while keeping its position fixed. Show an early, small but visible part of the action (26.3% of the full change from this input). Apply that fraction of the focal-length change. Show the corresponding framing from the same viewpoint. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph by applying a 26.3% focal-length increase from the original viewpoint, producing a modest zoom-in while keeping the camera position fixed. Show the same young East Asian woman from the first image with her face and upper torso enlarged by that fraction, while retaining her exact identity, near-frontal head angle, gentle closed-mouth smile, dark eyes, black hair tied back with wispy bangs, and raised right hand making the same V sign. Preserve her black short-sleeved high-neck top exactly, including the white swallow graphics on the chest and lower torso, with no alteration to their geometry or material. Keep her posture and expression unchanged. Reveal slightly less of the red wall, green roof tiles, trees, and paved ground around her because of the tighter framing, with the background compressed naturally by the longer focal length. Preserve the red wall, weathered gray wooden eaves, green ceramic roof ornaments, leafy trees, and gray paving stones exactly as photographed. Keep the original daylight, color balance, shadows, and all scene lighting unchanged; do not introduce any new objects, gestures, people, or environmental details."
          },
          "F19": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera zooms in by lengthening the focal length while keeping its position fixed. Show the action exactly halfway toward its endpoint (50.0% of the full change from this input). Apply that fraction of the focal-length change. Show the corresponding framing from the same viewpoint. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same young East Asian woman from the first image, viewed from the identical fixed camera position after applying exactly 50% of the requested focal-length zoom-in. Show her at the halfway point of the magnification, with the camera centered closer on her face and upper torso while preserving her exact identity, facial geometry, gentle closed-mouth smile, near-frontal head angle, and direct gaze. Keep her black hair tied back with wispy bangs and loose strands beside her cheeks, and retain the same raised peace-sign gesture at frame-left. Preserve the fitted black high-neck short-sleeve top exactly, including both white swallow illustrations in their original positions and scale relationships. The tighter framing enlarges her head, face, raised hand, and upper torso by the corresponding amount while leaving the red wall, green glazed roof tiles, dark wooden eaves, brick base, and paved ground naturally compressed behind her. Keep the background architecture aligned with the original perspective and unchanged in color, material, and illumination. Preserve the same soft outdoor daylight, shadows, skin tone, and all scene details without introducing any new objects, people, text, or changes to her pose."
          },
          "F29": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera zooms in by lengthening the focal length while keeping its position fixed. Show a strong, nearly completed movement (76.3% of the full change from this input). Apply that fraction of the focal-length change. Show the corresponding framing from the same viewpoint. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same young East Asian woman from the first image after applying a 76.3% zoom-in from the same fixed camera position by lengthening the focal length. Show a strong, nearly completed telephoto view centered closely on her face and upper torso, with her head filling most of the frame while retaining her exact identity, facial geometry, gentle closed-mouth smile, direct gaze, and raised peace-sign hand. Preserve her fair skin, dark eyes, black hair tied back with wispy bangs, and the same black short-sleeved high-neck top with its white swallow graphics in their original positions. Keep her pose and body orientation unchanged, but let the tighter framing naturally exclude more of her lower torso and the surrounding scene. Retain the same red wall, green glazed roof tiles, dark wooden eaves, and leafy tree canopy only as compressed background context around her head and shoulders, with the brick paving and lower wall largely outside the frame. Preserve the original daylight direction, color, exposure, and scene lighting without alteration. Keep all materials, proportions, and spatial relationships consistent with the original photograph, with no added objects, text, or changes to her expression."
          },
          "F38": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The camera zooms in by lengthening the focal length while keeping its position fixed. Show the action at its full natural endpoint (100%). Apply that fraction of the focal-length change. Show the corresponding framing from the same viewpoint. The subject and scene remain still. Preserve their identity, geometry and materials, and keep scene lighting unchanged. Keep camera controls unrelated to this action fixed. Return one natural photograph.",
            "flux_expanded": "Create a photograph of the same young East Asian woman from the first image, viewed from the identical fixed camera position after applying a strong focal-length zoom-in at its full natural endpoint. Her face and upper torso fill nearly the entire frame, with her head, hair, raised peace-sign hand, shoulders, and upper black top enlarged while remaining still in their original geometry. Preserve her exact identity, fair skin, near-frontal head angle, gentle closed-mouth smile, dark eyes, center-parted wispy bangs, tied-back black hair, and natural facial proportions. Keep the fitted black short-sleeved turtleneck dress unchanged, including the white swallow graphics on the chest and lower torso, with the raised hand retaining the same V-sign and finger placement. Preserve the original scene lighting and colors while allowing the red wall, green glazed roof tiles, dark wooden eaves, and leafy trees to recede naturally behind her because of the tighter perspective; only small peripheral portions of those background elements remain visible around her head and shoulders. Do not alter her pose, expression, clothing, materials, or any other scene content, and keep the original daylight direction, exposure, and color balance unchanged."
          }
        }
      },
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "selected": "F15",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/2b3f19e4f447812585bf-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/650fd3b1514f17de50cc-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/d85fe4f0e487a1699e1e-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/ff7a65ee821855b9fca8-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/850b68c2e0f7ee7fc962-w760.jpg"
            }
          ],
          "note": "Smooth optical focal-length progression (refined and selected at F15)."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "selected": "F19",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/2b3f19e4f447812585bf-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/60c41587d8930fb9dcaa-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/b833f2d3b37b5bd3a410-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/50fd69ae98863bdb406e-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/c2a15fe66de67e9e0e81-w760.jpg"
            }
          ],
          "note": "Uneven scale jumps and subtle texture re-synthesis across independent prompts."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "selected": "F29",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/2b3f19e4f447812585bf-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/4c93f154db62db44c34d-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/6e6b42f7e097cc7b8c84-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/60e7cb28591cfc26a734-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/080b346a25696780b794-w760.jpg"
            }
          ],
          "note": "Inverted zoom extent (F38 < F19 < F29 < F10)—extent prompt fails as a monotonic scale dial."
        }
      ]
    },
    {
      "case_id": "05139",
      "track_label": "Open-ended",
      "round_label": "R02",
      "adapter_label": "Lighting",
      "headline": "Progressive facial shadow flattening in a night portrait",
      "summary": "SimShoot smoothly lifts shadow contrast across the shaded cheek from F0 to F38 while preserving nighttime street lights; Qwen-Image 2.1 collapses into 6/6 tied/flat frames without coherent lighting progression and is rejected (F0).",
      "action_id": "light.key_flatten()",
      "h3_rank": "6/6 Ordered (0 Reversals)",
      "qwen_rank": "0/6 Ordered (All Tied)",
      "prompts": {
        "h3": "A continuous shot starting from the input image. The directional lighting on the face becomes even and frontal, reducing the brightness difference between the two sides and softening facial shadows. Keep the camera, pose, expression and scene geometry fixed. Preserve the person's identity, clothing and materials; only the lighting changes. The action progresses smoothly without cuts or additional actions.",
        "extents": {
          "F10": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The directional lighting on the face becomes even and frontal, reducing the brightness difference between the two sides and softening facial shadows. Show an early, small but visible part of the action (26.3% of the full change from this input). Apply that fraction of the reduction in side-to-side facial lighting contrast. Keep the camera, pose, expression and scene geometry fixed. Preserve the person's identity, clothing and materials; only the lighting changes. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing only the facial illumination of the first image, preserving the original nighttime portrait exactly as photographed. Keep the woman’s identity, near-frontal head angle, direct gaze, gentle closed-mouth smile, straight dark hair, pearl stud earrings, deep burgundy wrap-style coat, black inner garment, camera position, framing, and the entire cityscape background unchanged. Apply only 26.3% of the requested lighting reduction: soften the strong directional side light across her face by reducing the brightness difference between the two sides by that fraction, replacing the pronounced shadow over the frame-right half of her face with a modest, even frontal fill. The result should show an early, small but visible step toward uniform illumination, with the frame-right cheek, eye, nose, and jaw receiving slightly more light while retaining natural facial contours and only faint residual shadow. Keep the face evenly readable without making it look flat or altering her skin texture. Preserve the dark night sky, distant city lights, bridge lights, and all original colors and scene geometry; change nothing except the facial lighting adjustment."
          },
          "F19": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The directional lighting on the face becomes even and frontal, reducing the brightness difference between the two sides and softening facial shadows. Show the action exactly halfway toward its endpoint (50.0% of the full change from this input). Apply that fraction of the reduction in side-to-side facial lighting contrast. Keep the camera, pose, expression and scene geometry fixed. Preserve the person's identity, clothing and materials; only the lighting changes. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing only the facial illumination of the first image, preserving the original nighttime portrait exactly as photographed. Keep the woman’s identity, near-frontal head angle, direct gaze, gentle closed-mouth smile, straight dark hair, pearl stud earrings, deep burgundy wrap-style coat, black inner garment, camera position, framing, and the entire cityscape geometry unchanged. Apply exactly 50% of the requested lighting change: reduce the directional side-to-side contrast across her face by half, leaving the remaining contrast at 50% of its original level. Make the illumination even and frontal to this halfway point, softening the strong shadow across the frame-right side of her face while retaining a subtle natural transition from the original side light. The frame-left and frame-right sides of her face should now have approximately equal brightness, with facial shadows softened and only faint natural modeling around the nose, cheeks, and jaw. Preserve the original nighttime exposure and colors without altering her skin tone or features. Keep the dark sky, distant city lights, illuminated bridge, and all background details in their exact positions, with no changes beyond the requested partial frontal lighting adjustment."
          },
          "F29": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The directional lighting on the face becomes even and frontal, reducing the brightness difference between the two sides and softening facial shadows. Show a strong, nearly completed movement (76.3% of the full change from this input). Apply that fraction of the reduction in side-to-side facial lighting contrast. Keep the camera, pose, expression and scene geometry fixed. Preserve the person's identity, clothing and materials; only the lighting changes. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing only the facial illumination of the first image, preserving the original nighttime portrait exactly as photographed. Keep the woman’s identity, near-frontal head angle, direct gaze, gentle closed-mouth smile, straight dark hair, pearl stud earrings, deep burgundy wrap-style coat, black inner garment, camera position, framing, and the entire cityscape geometry unchanged. Apply approximately 76.3% of the requested reduction in directional side-to-side facial contrast, replacing the strong directional light with even, soft frontal illumination across her face. Remove the dark shadow covering the frame-right side of her forehead, eye, cheek, nose, and mouth, leaving both sides equally bright with natural skin color and only faint, soft facial modeling. Preserve her exact facial structure, features, expression, hairline, and clothing materials without alteration. Keep the dark night sky and the distant city lights in their original positions, including the yellow-lit bridge at frame-left, the red-orange lights at frame-right, and all smaller blue, white, and green lights. The lighting change should remain seamless and natural, with no added objects, retouching, reshaping, or changes to the background."
          },
          "F38": {
            "raw": "Edit the input photograph. The full endpoint for this one action is: The directional lighting on the face becomes even and frontal, reducing the brightness difference between the two sides and softening facial shadows. Show the action at its full natural endpoint (100%). Apply that fraction of the reduction in side-to-side facial lighting contrast. Keep the camera, pose, expression and scene geometry fixed. Preserve the person's identity, clothing and materials; only the lighting changes. Return one natural photograph.",
            "flux_expanded": "Create a photograph by editing only the facial illumination of the first image. Keep the woman exactly as photographed, preserving her identity, near-frontal head angle, direct gaze, gentle closed-mouth smile, straight dark hair, pearl stud earrings, deep burgundy wrap-style coat, black inner garment, and all original fabric texture. Change the directional light across her face to even, soft frontal illumination, fully eliminating the strong side-to-side brightness difference and the dark shadow covering the frame-right side of her face. Balance the light naturally across both cheeks, forehead, nose, and chin, with soft facial shadows and consistent skin tone while retaining her real facial structure and features. Keep the camera position, framing, pose, expression, clothing, and scene geometry fixed. Preserve the nighttime city background exactly as shown, including the dark sky, distant hills, illuminated bridge, rows of red, white, blue, and yellow lights, and every existing light source in its original location. Do not alter the background exposure or add any new objects; only the facial lighting changes to a natural, evenly frontal result."
          }
        }
      },
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "selected": "F29",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/34ac6d7eda5be6ef8a9e-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/3e33baf063f6ccb46b43-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/d018a04906ac61b13fba-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/be2246d1558b558a621e-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/e3142d6584ae85177836-w760.jpg"
            }
          ],
          "note": "Continuous, calibrated shadow fill from F0→F38 (accepted at F29) preserving authentic night mood."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "selected": "F19",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/34ac6d7eda5be6ef8a9e-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/87357d3948b271b9f577-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/0cb5aa846d562ff45a6e-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/c4889e88d72c08acebe1-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/ea5d8143b1e60cce9506-w760.jpg"
            }
          ],
          "note": "Abrupt exposure jump with weaker gradation between intermediate levels."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "selected": "F0",
          "frames": [
            {
              "label": "F0",
              "src": "assets/media/img/34ac6d7eda5be6ef8a9e-w760.jpg"
            },
            {
              "label": "F10",
              "src": "assets/media/img/fc29530c3f94b0634750-w760.jpg"
            },
            {
              "label": "F19",
              "src": "assets/media/img/1ef50ed05385cd1d42d9-w760.jpg"
            },
            {
              "label": "F29",
              "src": "assets/media/img/102e2bc95ba1cf4ae815-w760.jpg"
            },
            {
              "label": "F38",
              "src": "assets/media/img/7838b192d0692f9eb476-w760.jpg"
            }
          ],
          "note": "No monotonic shadow-fill ramp across F10–F38—Selector rejects (F0)."
        }
      ]
    }
  ],
  "b4b_cases": [
    {
      "case_id": "05508",
      "track_label": "Open-ended",
      "short_label": "05508 · Cafe Table Portrait",
      "headline": "Cafe Table Portrait",
      "summary": "Compare overall exposure, sharpness, and body proportions across the full portrait: FLUX 3 Klein Base collapses into a dark, heavily blurred frame and Qwen-Image 2.1 adds dirty wall mottling alongside awkward torso distortion, whereas SimShoot stays bright, sharp, and faithful to the subject's identity.",
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "summary_badge": "3 edits · max_edits",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/bb81e19a40c2429485b3-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "expression.open(\"The person forms a small closed-lip smile with gently lifted mouth corners and a relaxed jaw, keeping both eyes comfortably open and directed toward the camera.\")",
              "outcome": "accepted",
              "src": "assets/media/img/30e585446b9d43e6b7a8-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "light.key_side(side=image_left)",
              "outcome": "accepted",
              "src": "assets/media/img/58e8865004303c47bb95-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "camera.reframe_y(direction=image_up)",
              "outcome": "accepted",
              "src": "assets/media/img/fbdbf12f1bc4f9768df1-w640.jpg"
            }
          ],
          "note": "3 edits · Brightens and balances the portrait with crisp skin texture, warm smile, faithful identity, and smooth cafe wall."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "summary_badge": "3 edits · max_edits",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/bb81e19a40c2429485b3-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "expression.open(\"The person forms a small closed-lip smile with gently lifted mouth corners and a relaxed jaw, keeping both eyes comfortably open and directed toward the camera.\")",
              "outcome": "accepted",
              "src": "assets/media/img/eed690792de916d02e6b-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "light.key_side(side=image_left)",
              "outcome": "accepted",
              "src": "assets/media/img/091f44f417930d2eb218-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "light.background(direction=darker)",
              "outcome": "accepted",
              "src": "assets/media/img/9a22ed55b6082387e265-w640.jpg"
            }
          ],
          "note": "3 edits · Drops into dark, muddy brown underexposure with heavy out-of-focus blur smearing face, hair, arms, and drink."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "summary_badge": "3 edits · max_edits",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/bb81e19a40c2429485b3-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "expression.open(\"The person forms a small closed-lip smile with gently lifted mouth corners and a relaxed jaw, keeping both eyes comfortably open and directed toward the camera.\")",
              "outcome": "accepted",
              "src": "assets/media/img/04dfad85bb9daa2dc11a-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "light.key_side(side=image_left)+note(\"The face and background retain their current natural color and texture, with only a gentle image-left brightness difference.\")",
              "outcome": "accepted",
              "src": "assets/media/img/41ab0e82b73fbde9f179-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "pose.open(\"The person turns the upper torso and both shoulders toward their own left into a modest three-quarter angle, keeping the head facing the camera and the hips, forearms, and hands unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/af5817e356efa610be4a-w640.jpg"
            }
          ],
          "note": "3 edits · Adds gritty mottled blotches across the beige wall and harsh sharpening while twisting torso/arms with a drifted face."
        }
      ]
    },
    {
      "case_id": "02456",
      "track_label": "Targeted",
      "short_label": "02456 · Birthday Cake Cafe",
      "headline": "Birthday Cake Cafe",
      "summary": "Look at facial identity, scene geometry, and wall cleanliness: FLUX 3 Klein Base zooms in, erases the pendant lamp and wall art, and drifts into a different generic face and cake, while Qwen-Image 2.1 smears dirty grey-brown blotches across the wall and crunches hair; SimShoot lowers the hand cleanly with spotless background and exact identity.",
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "summary_badge": "3 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/86ac9e7fb1c85ffbede9-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "camera.zoom(direction=in)",
              "outcome": "accepted",
              "src": "assets/media/img/816d73a481a13a3398bc-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "pose.open(\"The person supports their own left cheek lightly with their own left fingertips beside the mouth, leaving the lips fully visible and keeping the head and their own right arm unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/28b5310ad6ee254d5ba2-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "pose.open(\"The person brings their own right elbow closer to their waist while keeping their own right hand and lighter steady at the same candle, their torso still, and their own left fingertips against their left cheek.\")",
              "outcome": "accepted",
              "src": "assets/media/img/d035e63893274b350a9f-w640.jpg"
            }
          ],
          "note": "3 edits · Lowers hand to reveal a gentle natural smile while keeping spotless wall, faithful identity, lamp, art, and cake intact."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "summary_badge": "3 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/86ac9e7fb1c85ffbede9-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "camera.zoom(direction=in)",
              "outcome": "accepted",
              "src": "assets/media/img/a89849f134d9ff505609-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "pose.open(\"The person rests their own left fingertips lightly against their own left cheek, with the palm clear of the mouth, keeping the head and their own right arm unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/5c76c997718c8367fa31-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "pose.open(\"The person brings their own right elbow closer to their waist while keeping the lighter aimed at the same candle and keeping the left hand and head unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/c78f18b8a74f9d0f0adf-w640.jpg"
            }
          ],
          "note": "3 edits · Zooms in aggressively, erases hanging lamp and wall art, replaces facial identity with soft waxy skin, and mutates cake."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "summary_badge": "2 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/86ac9e7fb1c85ffbede9-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "camera.zoom(direction=in)",
              "outcome": "accepted",
              "src": "assets/media/img/ea1d43f31dde4483f45a-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "pose.open(\"The person moves their own left hand away from the mouth so the left fingertips rest lightly on their own left cheek beside the lips, keeping the mouth fully visible and the right arm unchanged.\")",
              "outcome": "fallback",
              "src": "assets/media/img/cf50042e2a7a54c1f8d3-w640.jpg"
            }
          ],
          "note": "2 edits · Covers the beige wall in grey-brown mottled noise patches and applies harsh, crunchy sharpening to hair, skin, and cake."
        }
      ]
    },
    {
      "case_id": "05429",
      "track_label": "Open-ended",
      "short_label": "05429 · Red Lantern Portrait",
      "headline": "Red Lantern Portrait",
      "summary": "Notice how sharply the festive details and face hold up across methods: FLUX 3 Klein Base suffers severe whole-frame defocus blur across subject and background, and Qwen-Image 2.1 crushes shadows dark and crunches the scene while producing a stiff hand gesture, whereas SimShoot delivers crisp knitwear, clear lanterns, and a natural relaxed pose.",
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "summary_badge": "3 edits · max_edits",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/a6ff8b3f8ac1d91d763a-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "pose.open(\"The person lowers their own left forearm so the left hand rests loosely against the scarf at the lower chest with relaxed fingers, keeping the shoulders, torso, head and other arm unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/7478a40b229e7ed1cd7c-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "light.key_side(side=image_left)",
              "outcome": "accepted",
              "src": "assets/media/img/93f6a5c3779ac4ddab36-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "camera.aperture(direction=wider)",
              "outcome": "accepted",
              "src": "assets/media/img/588776a1ebfe64aa0e29-w640.jpg"
            }
          ],
          "note": "3 edits · Relaxes pointing arm cleanly downward with crisp sweater knit and scarf textures, faithful identity, and bright lanterns."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "summary_badge": "2 edits · dof_final",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/a6ff8b3f8ac1d91d763a-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "pose.open(\"The person lowers their own left forearm so the left hand rests loosely against the scarf at the lower chest with relaxed fingers, keeping the shoulders, torso, head and other arm unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/69842494d790da54b320-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "camera.aperture(direction=wider)",
              "outcome": "accepted",
              "src": "assets/media/img/77e623650ccff4a144e0-w640.jpg"
            }
          ],
          "note": "2 edits · Suffers severe whole-frame defocus blur smearing face, eyes, hair, knit sweater, scarf, hands, and lanterns into soft mush."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "summary_badge": "2 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/a6ff8b3f8ac1d91d763a-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "pose.open(\"The person lowers their own left forearm so the left hand rests loosely against the scarf at the lower chest with relaxed fingers, keeping the shoulders, torso, head and other arm unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/e4a694255aea686fc9f9-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "light.key_side(side=image_left)+note(\"The image-left face is softly brighter, with original skin and material texture, gentle facial contrast, unchanged background contrast, and the same smile and gaze.\")",
              "outcome": "accepted",
              "src": "assets/media/img/8073f9054cad9febb367-w640.jpg"
            }
          ],
          "note": "2 edits · Crushes upper-left background murky dark, over-sharpens festive clutter, and twists right hand stiffly onto the scarf."
        }
      ]
    },
    {
      "case_id": "00434",
      "track_label": "Targeted",
      "short_label": "00434 · White Cape Coat",
      "headline": "White Cape Coat",
      "summary": "Compare framing consistency, fabric cleanliness, and facial clarity against S0: FLUX 3 Klein Base shrinks the subject into dim lighting with a stiff elongated coat and tiny blurred face, and Qwen-Image 2.1 catastrophically corrupts coat, skin, and building textures with chromatic noise, while SimShoot keeps crisp fabric, clean architecture, and faithful identity.",
      "arms": [
        {
          "name": "SimShoot (H3 + LoRA)",
          "is_ours": true,
          "summary_badge": "3 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/97b12850675e63598f60-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "camera.dolly(direction=farther)",
              "outcome": "accepted",
              "src": "assets/media/img/e85cacf95a49b2c2ee18-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "pose.open(\"The person rests their own right hand lightly at their own right side of the belt with relaxed fingers and a naturally bent elbow, keeping their left arm, torso, shoulders, and head unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/56f90d74b0d31c7aef5c-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "expression.open(\"The person brings their lips gently together with both mouth corners remaining lifted, keeping their eyes, gaze, brows, and cheeks unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/8b13375d1092b970aa44-w640.jpg"
            }
          ],
          "note": "3 edits · Preserves balanced framing, bright architectural tones, crisp white quilted coat, and exact identity with a calm smile."
        },
        {
          "name": "FLUX 3 Klein Base",
          "is_ours": false,
          "summary_badge": "3 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/97b12850675e63598f60-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "camera.dolly(direction=farther)",
              "outcome": "accepted",
              "src": "assets/media/img/56d569af66859f43bac6-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "pose.open(\"The person rests their own right hand at their own right side of the belt with relaxed fingers and a naturally bent right elbow, keeping the right shoulder relaxed, the torso still and the other arm unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/95215811179a44e5c052-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "expression.open(\"The person brings their lips gently together with both mouth corners remaining lifted in a natural closed-lip smile, keeping the eyes, gaze and brows unchanged.\")",
              "outcome": "accepted",
              "src": "assets/media/img/6291147ed393436bdc27-w640.jpg"
            }
          ],
          "note": "3 edits · Collapses into an extreme distant zoom-out with dull flat grey lighting, stiff elongated coat, and tiny drifted face."
        },
        {
          "name": "Qwen-Image 2.1",
          "is_ours": false,
          "summary_badge": "3 edits · planner_stop",
          "states": [
            {
              "state_label": "S0",
              "action_label": "Original Input",
              "outcome": "input",
              "src": "assets/media/img/97b12850675e63598f60-w640.jpg"
            },
            {
              "state_label": "S1",
              "action_label": "camera.dolly(direction=farther)",
              "outcome": "accepted",
              "src": "assets/media/img/ee307f57eb564daf8a8a-w640.jpg"
            },
            {
              "state_label": "S2",
              "action_label": "pose.open(\"The person rests their own right hand lightly on the belt at their outer right waist, away from the buckle, with a naturally bent elbow, keeping the left arm, facial expression, and original photographic texture unchanged.\")",
              "outcome": "fallback",
              "src": "assets/media/img/2a80b5b853906f48631d-w640.jpg"
            },
            {
              "state_label": "S3",
              "action_label": "expression.open(\"The person rests both lips gently together with the mouth corners lifted and no teeth visible, keeping the eyes, brows, gaze, facial contours, and existing skin texture unchanged without added sharpening or contrast.\")",
              "outcome": "fallback",
              "src": "assets/media/img/a0e17c7d8152d3e15ada-w640.jpg"
            }
          ],
          "note": "3 edits · Breaks down across the full image with severe mosaic sharpening and chromatic noise on coat, face, and building facade."
        }
      ]
    }
  ],
  "full_runs": [
    {
      "case_id": "01080",
      "display_id": "Case 1",
      "track_label": "Targeted",
      "role_badge": "3 Valid Edits · Demonstration Walkthrough · planner_stop",
      "short_label": "Cafe Portrait",
      "stop_reason": "planner_stop",
      "headline": "Canonical 3-edit closed-loop reshoot matching the demonstration video and Figure 1",
      "summary": "Matches the demonstration video and paper Figure 1 end-to-end across three distinct adapters: cheek-support pose (R1 F38), partial-extent downward gaze (R2 F19), camera orbit with coarse-to-fine interval refinement on [F10–F19] → F17 (R3), and voluntary <code>planner_stop</code> (R4).",
      "goal_items": [
        {
          "id": "pose",
          "num": "01",
          "family": "pose",
          "title": "Rest fingertips on right cheek",
          "detail": "Move right hand from chin to cheek while keeping elbow on table."
        },
        {
          "id": "expression",
          "num": "02",
          "family": "expression",
          "title": "Look down at food basket",
          "detail": "Shift gaze naturally from camera toward the meal in front."
        },
        {
          "id": "camera",
          "num": "03",
          "family": "camera",
          "title": "Orbit left to clear wall camera",
          "detail": "Move camera left so the wall fixture no longer sits above the head."
        }
      ],
      "states": [
        {
          "index": 0,
          "short_label": "S0",
          "label": "S0 (Input)",
          "round": 0,
          "note": "Original portrait",
          "src": "assets/media/img/93afe223a49fb9d0a262-w720.jpg"
        },
        {
          "index": 1,
          "short_label": "S1",
          "label": "S1",
          "round": 1,
          "note": "Pose · F38",
          "src": "assets/media/img/b077e83e0e15fae698d2-w720.jpg"
        },
        {
          "index": 2,
          "short_label": "S2",
          "label": "S2",
          "round": 2,
          "note": "Gaze · F19",
          "src": "assets/media/img/89fe09a7e2def7e3845a-w720.jpg"
        },
        {
          "index": 3,
          "short_label": "S3",
          "label": "S3 (Final)",
          "round": 3,
          "note": "Orbit · F17",
          "src": "assets/media/img/1a93ab48be1f6852e971-w720.jpg"
        }
      ],
      "rounds": [
        {
          "round": 1,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 0,
          "state_out": 1,
          "family": "pose",
          "adapter_label": "Pose LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F38",
          "selected_frame_idx": 38,
          "step_short": "Pose",
          "step_pill": "F38 ✓",
          "badge": "Accepted · F38",
          "action_id": "pose.open(\"The person rests their own right fingertips against their own right cheek, keeping their right elbow on the table, head still, mouth unchanged, and the other arm unchanged.\")",
          "action_chip": "pose.open(\"Rest right fingertips gently against right cheek, elbow on table\")",
          "planner_diag": "Hand under the chin looks slightly staged. Adjust the hand pose first before shifting gaze and orbiting the camera so person edits settle cleanly.",
          "checklist_state": [
            "active",
            "pending",
            "pending"
          ],
          "coarse_reason": "",
          "verdict_head": "Keep F38 as S1.",
          "verdict_body": "F29 barely touches the cheek, while F38 rests naturally with curved fingertips, planted elbow, and sharp facial features.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/93afe223a49fb9d0a262-w420.jpg",
              "src_hi": "assets/media/img/93afe223a49fb9d0a262-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/f352f9c1f4076a3016fb-w420.jpg",
              "src_hi": "assets/media/img/f352f9c1f4076a3016fb-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Hand lifts",
              "raw_note": "The right hand has withdrawn slightly from beneath the chin but remains below the cheek; the head is slightly raised. The elbow and other arm remain in place."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/2ff9899d02f3ab81d7a9-w420.jpg",
              "src_hi": "assets/media/img/2ff9899d02f3ab81d7a9-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Nears cheek",
              "raw_note": "The right fingertips approach the lower outer cheek, although the hand still reads as moving into position rather than supporting it. The head is slightly raised, with the gaze and closed-mouth expression maintained."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/fb53c56ca516c1ee9503-w420.jpg",
              "src_hi": "assets/media/img/fb53c56ca516c1ee9503-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Light touch",
              "raw_note": "The right fingertips contact the upper outer cheek near the ear, with the elbow resting on the table. The gesture is natural, although the hand reads somewhat more as touching the cheek than supporting its weight."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/b077e83e0e15fae698d2-w420.jpg",
              "src_hi": "assets/media/img/b077e83e0e15fae698d2-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Settled pose",
              "raw_note": "The right hand settles against the cheek, with gently curved fingertips along its outer edge and the lower hand providing support. The elbow remains on the table; a slight head tilt accompanies the settled gesture. Facial features remain sharp and recognizable."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/96cce8e5f8effff3f599.mp4",
          "raw_trace": {
            "last_round_review": "first round",
            "plan_step": "Fixes the slightly staged hand-under-chin pose by resting the subject's right fingertips against her right cheek while keeping her right elbow on the table, producing a more natural supported-cheek gesture.",
            "video_summary": "The right hand moves from beneath the chin to the outer right cheek, reaching contact by F29 and settling into a supported-cheek gesture at F38 while the elbow stays on the table. The head rises and tilts slightly, but the camera-directed gaze, quiet expression, other arm, framing, lighting, and scene remain substantially unchanged.",
            "selector_reason": "F38 most clearly completes the requested gesture and looks settled and natural. The close-up retains her identity, facial structure, and sharp eyes and mouth without visible facial smearing; the fingers appear natural, the elbow stays planted, and the other arm is preserved. The small head-position change is the only notable drift, and the final gesture improves the portrait while keeping its quiet character. F29 is similar but provides less convincing cheek support, so refinement is unnecessary.",
            "coarse_trajectory": "The ideal frame places her right fingertips naturally against her right cheek, with the elbow still on the table and her identity, expression, gaze, other arm, and setting preserved. The hand withdraws from beneath the chin, rises toward the cheek by F19, and settles against the side of the cheek in F29–F38. The final frame gives the clearest supported-cheek gesture, with a slight accompanying head tilt.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 2,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 1,
          "state_out": 2,
          "family": "expression",
          "adapter_label": "Expression LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F19",
          "selected_frame_idx": 19,
          "step_short": "Gaze",
          "step_pill": "F19 ✓",
          "badge": "Accepted · F19",
          "action_id": "expression.open(\"The person directs both eyes downward toward the food basket immediately in front of them, keeping the head, brows, mouth, and right fingertips supporting the right cheek unchanged.\")",
          "action_chip": "expression.open(\"Direct both eyes downward toward the food basket\")",
          "planner_diag": "Cheek support is settled (S1), while her eyes still look at the lens. Redirect her gaze toward the meal while preserving the quiet mouth and hand contact.",
          "checklist_state": [
            "done",
            "active",
            "pending"
          ],
          "coarse_reason": "",
          "verdict_head": "Keep F19 as S2.",
          "verdict_body": "Downward gaze settles naturally on the basket by F19 with clearly open eyes and intact cheek support; later frames add no benefit.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/b077e83e0e15fae698d2-w420.jpg",
              "src_hi": "assets/media/img/b077e83e0e15fae698d2-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/093dcb565af5e8f19fd3-w420.jpg",
              "src_hi": "assets/media/img/093dcb565af5e8f19fd3-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Gaze drops",
              "raw_note": "Both eyes turn downward toward the meal, with open eyelids and a relaxed expression. The supporting fingertips, mouth, and head tilt remain substantially unchanged, and facial features read sharply in the close-up."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/89fe09a7e2def7e3845a-w420.jpg",
              "src_hi": "assets/media/img/89fe09a7e2def7e3845a-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Settled gaze",
              "raw_note": "The downward gaze settles toward the basket, creating a natural, quiet connection with the meal. Both eyes remain visibly open and aligned; cheek contact, relaxed brows, closed lips, facial structure, and fine detail are preserved."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/0fd5ca4c93846c1f1c51-w420.jpg",
              "src_hi": "assets/media/img/0fd5ca4c93846c1f1c51-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Lower lids",
              "raw_note": "The subject maintains essentially the same downward gaze as F19, with a marginally lower eyelid position. The cheek support, expression, clothing, scene, and sharp facial features remain consistent with CURRENT."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/9d1c0326fc95372d213e-w420.jpg",
              "src_hi": "assets/media/img/9d1c0326fc95372d213e-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Holds gaze",
              "raw_note": "The downward gaze holds with slightly more lowered eyelids, while both eyes remain open. The supported-cheek gesture and quiet mouth are retained, with no meaningful change to identity, framing, lighting, or scene detail."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/02b5f79062cf4c7fa688.mp4",
          "raw_trace": {
            "last_round_review": "The video completed the requested right-hand move: the fingertips now rest against the outer right cheek, with the right elbow remaining on the table. The head rose and tilted slightly, but the supported pose looks settled, the fingers remain natural, and identity, quiet expression, other arm, framing, lighting, and scene are substantially preserved. Mark the hand step done and proceed with the requested gaze change.",
            "plan_step": "Replace the camera-directed gaze with both eyes looking down toward the food basket immediately in front of the subject, preserving the accepted head pose and quiet mouth for a candid connection with the meal.",
            "video_summary": "Both eyes shift from the camera down toward the food basket by F10 and settle by F19, then hold through the end. The accepted cheek support and quiet expression remain intact, without meaningful head movement, mismatched eye directions, closed eyes, or visible facial blur.",
            "selector_reason": "F19 gives the most natural settled gaze toward the meal while retaining clearly open eyes and sharp facial features. It preserves the earlier cheek-support edit and the person's character; the minor cumulative difference is the head settling already introduced in round 1. Later frames offer no clear improvement, so refinement is unnecessary.",
            "coarse_trajectory": "The ideal frame shows both eyes looking naturally down toward the skewer basket, with comfortably open eyelids, the accepted cheek support, quiet mouth, identity, and photographic detail preserved. The gaze drops clearly by F10, settles slightly farther downward by F19, and remains almost unchanged through F38; the hand, body, framing, scene, and lighting stay stable.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 3,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 2,
          "state_out": 3,
          "family": "camera",
          "adapter_label": "Orbit LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": true,
          "refine_bracket": [
            10,
            19
          ],
          "selected_label": "F17",
          "selected_frame_idx": 17,
          "step_short": "Orbit",
          "step_pill": "F17 ★",
          "badge": "Accepted · F17",
          "action_id": "camera.orbit_azimuth(direction=clockwise_from_above)",
          "action_chip": "camera.orbit_azimuth(direction=clockwise_from_above)",
          "planner_diag": "Pose and gaze are complete (S2), but the wall-mounted camera still sits directly above her head. Orbit left to clear the fixture cleanly.",
          "checklist_state": [
            "done",
            "done",
            "active"
          ],
          "coarse_reason": "F10 barely clears the fixture, while F19 adds more viewpoint shift than needed. Sample 3 in-between frames on [F10–F19] from the same rollout.",
          "verdict_head": "Keep F17 as S3.",
          "verdict_body": "Fine sampling pinpoints F17—giving the wall fixture comfortable clearance from the head at a restrained angle while keeping pose, gaze, and subject scale intact.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/89fe09a7e2def7e3845a-w420.jpg",
              "src_hi": "assets/media/img/89fe09a7e2def7e3845a-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/8df8ec57100b5251cf9f-w420.jpg",
              "src_hi": "assets/media/img/8df8ec57100b5251cf9f-w720.jpg",
              "chosen": false,
              "in_bracket": true,
              "is_new": false,
              "tag": "Too subtle",
              "raw_note": "The camera has begun orbiting toward image-left; the security camera shifts slightly left of the crown and the subject gains a small change in viewpoint."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/4495222cccca71bee30b-w420.jpg",
              "src_hi": "assets/media/img/4495222cccca71bee30b-w720.jpg",
              "chosen": false,
              "in_bracket": true,
              "is_new": false,
              "tag": "Clears head",
              "raw_note": "The orbit is clearly visible: the security camera sits distinctly to image-left of the head, with more of the exterior background revealed and a moderate three-quarter view of the subject."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/4bfdfe594906a0d4e819-w420.jpg",
              "src_hi": "assets/media/img/4bfdfe594906a0d4e819-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Overshoot",
              "raw_note": "The camera continues farther toward image-left; the security camera is well clear of the crown, the subject is more strongly three-quarter view, and substantially more of the railing and outdoor background appears."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/517a7a818a5c2beb7cd1-w420.jpg",
              "src_hi": "assets/media/img/517a7a818a5c2beb7cd1-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Strong angle",
              "raw_note": "The orbit reaches its strongest point, placing the fixture far to image-left and producing a pronounced side angle with a much larger shift of the background."
            }
          ],
          "refine_frames": [
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/8df8ec57100b5251cf9f-w420.jpg",
              "src_hi": "assets/media/img/8df8ec57100b5251cf9f-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Partial orbit",
              "raw_note": "A small orbit shifts the security camera left of the crown, although it remains above the hair. The cheek support, downward gaze, relaxed lips, and approximate framing scale remain unchanged."
            },
            {
              "label": "F12",
              "frame_index": 12,
              "src": "assets/media/img/fbe2c381f2d35c1a2120-w420.jpg",
              "src_hi": "assets/media/img/fbe2c381f2d35c1a2120-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": true,
              "tag": "Over hair",
              "raw_note": "The fixture moves farther left relative to the crown, improving separation while remaining over the outer portion of the hair. Facial features remain sharp, and both arms and the food-directed gaze hold naturally."
            },
            {
              "label": "F15",
              "frame_index": 15,
              "src": "assets/media/img/416bc595d27db805b35f-w420.jpg",
              "src_hi": "assets/media/img/416bc595d27db805b35f-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": true,
              "tag": "Clears crown",
              "raw_note": "The security camera is clearly offset to image-left of the crown. The modestly more oblique viewpoint preserves the person's identity, fingertip contact, elbow support, expression, and apparent size."
            },
            {
              "label": "F17",
              "frame_index": 17,
              "src": "assets/media/img/1a93ab48be1f6852e971-w420.jpg",
              "src_hi": "assets/media/img/1a93ab48be1f6852e971-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": true,
              "tag": "Ideal margin",
              "raw_note": "The fixture has a comfortable lateral separation from the upper head, with a restrained three-quarter viewpoint and balanced placement of the subject and meal. Eyes, lips, hair strands, and supporting fingers remain well defined; gaze and cheek contact are maintained."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/4495222cccca71bee30b-w420.jpg",
              "src_hi": "assets/media/img/4495222cccca71bee30b-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Stronger angle",
              "raw_note": "The orbit separates the fixture farther from the head and reveals more of the terrace at image-right. The face remains recognizable and sharp, and the supported pose is retained, but the stronger angle and greater rightward placement of the meal add no clear benefit over F17."
            }
          ],
          "video": "assets/media/vid/c12887254ffdbc7f0726.mp4",
          "raw_trace": {
            "last_round_review": "The last video successfully redirected both eyes toward the food basket, with a natural settled gaze by F19. The eyelids remain comfortably open, facial detail stays sharp, and the supported right cheek, planted right elbow, quiet mouth, and scene remain intact. The gaze step is complete; only the requested camera move remains.",
            "plan_step": "Resolve the security camera's alignment above the crown by orbiting the taking camera toward image-left until the fixture sits clearly to image-left of the head, retaining the subject's location, supported-cheek pose, food-directed gaze, and original framing scale.",
            "video_summary": "The video performs the requested clockwise orbit: the subject is viewed increasingly from the side while the wall and security camera sweep toward image-left. Useful separation is reached around F15–F17; later frames introduce a much stronger angle, crop the meal more heavily, and eventually carry the security camera out of view.",
            "selector_reason": "F17 provides clear separation from the distracting fixture with a modest viewpoint change and approximately the original subject scale. The close-up retains sharp facial features and the same identity without visible facial redraw or blur; the eyes stay on the meal, fingertips remain against the cheek, and both forearms retain their supported positions. Clothing, body proportions, lighting, focus, and visible scene elements remain consistent, with background displacement explained by the orbit. Cumulative differences from the original are limited to small hair and fabric variations accompanying the earlier edits, and the person's quiet character remains intact. F15 is also clean, but F17 gives the fixture a more comfortable margin; later frames change the viewpoint more than needed.",
            "coarse_trajectory": "The ideal frame keeps the supported-cheek pose, downward food-directed gaze, original scale and photographic texture while orbiting just far enough toward image-left to place the security camera clearly left of the crown. From left to right, the background and wall fixture slide toward image-left while the subject gains a progressively stronger three-quarter view; the fixture becomes clearly clear of the crown around F19 and the later frames continue past the smallest useful orbit.",
            "refine_trajectory": "The ideal frame uses a modest orbit toward image-left to separate the wall-mounted security camera from the head while preserving the supported cheek, food-directed gaze, subject scale, facial detail, and existing light. Across this sheet, the background slides left and the subject is seen progressively more from the side; F15 establishes clear separation from the crown, and F17 gives the fixture a more comfortable margin without the stronger viewpoint change of later frames."
          }
        },
        {
          "round": 4,
          "is_stop": true,
          "accepted": false,
          "outcome": "stop",
          "state_in": 3,
          "state_out": 3,
          "family": "stop",
          "adapter_label": "Action LoRA",
          "seed": null,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "",
          "selected_frame_idx": null,
          "step_short": "Stop",
          "step_pill": "planner_stop",
          "badge": "planner_stop",
          "action_id": "",
          "action_chip": "planner_stop (deliver S3)",
          "planner_diag": "Orbit cleared the wall camera while preserving cheek support, downward gaze, and facial detail. All three edits are complete.",
          "checklist_state": [
            "done",
            "done",
            "done"
          ],
          "coarse_reason": "",
          "verdict_head": "Terminate via planner_stop.",
          "verdict_body": "All requested edits verified; SimShoot terminates voluntarily and returns S3.",
          "coarse_frames": [],
          "refine_frames": [],
          "video": null,
          "raw_trace": {
            "last_round_review": "The orbit moved the wall-mounted security camera toward image-left, clear of the subject's crown. The accepted frame preserves the supported cheek, downward gaze, facial detail and lighting; later frames show a stronger viewpoint change and more scene displacement than needed.",
            "plan_step": "",
            "video_summary": "",
            "selector_reason": "",
            "coarse_trajectory": "",
            "refine_trajectory": ""
          }
        }
      ],
      "final_summary": {
        "decision_badge": "planner_stop · 3/3 edits verified",
        "decision_tone": "ok",
        "headline": "Reshoot complete — voluntary stop.",
        "rationale": "Round 3's refined orbit frame F17 clears the wall-mounted security camera from above the crown with a restrained viewpoint change, preserving cheek support, downward gaze, and crisp facial detail. In Round 4, the Planner verifies all three edits and terminates voluntarily, delivering S3.",
        "checklist_state": [
          "done",
          "done",
          "done"
        ],
        "before_src": "assets/media/img/93afe223a49fb9d0a262-w720.jpg",
        "after_src": "assets/media/img/1a93ab48be1f6852e971-w720.jpg",
        "final_label": "S3"
      }
    },
    {
      "case_id": "05900",
      "display_id": "Case 2",
      "track_label": "Targeted",
      "role_badge": "3 Valid Edits · Rejection & Retry Recovery · planner_stop",
      "short_label": "Park Glasses Portrait",
      "stop_reason": "planner_stop",
      "headline": "End-to-end closed loop with interval refinement, F0 rejection, seed-43 retry recovery, and voluntary stop",
      "summary": "Exercises every closed-loop mechanism in 3 valid edits: coarse interior hand reframing (R1 F19), interval refinement for a gentle smile (R2 F10–F19 → F12), F0 rejection of weak fill light (R3), recovery via incremented seed + <code>retry_note</code> (R4 F29), and voluntary <code>planner_stop</code> (R5).",
      "goal_items": [
        {
          "id": "pose",
          "num": "01",
          "family": "pose",
          "title": "Bring right hand inside frame",
          "detail": "Move the raised right hand inward inside the left frame edge."
        },
        {
          "id": "expression",
          "num": "02",
          "family": "expression",
          "title": "Slight closed-mouth smile",
          "detail": "Gently lift both mouth corners without parting the lips."
        },
        {
          "id": "light",
          "num": "03",
          "family": "light",
          "title": "Soft fill under eye sockets",
          "detail": "Add subtle near-lens fill beneath the glasses while keeping sunlight intact."
        }
      ],
      "states": [
        {
          "index": 0,
          "short_label": "S0",
          "label": "S0 (Input)",
          "round": 0,
          "note": "Original portrait",
          "src": "assets/media/img/8681153f51f9090c9b6c-w720.jpg"
        },
        {
          "index": 1,
          "short_label": "S1",
          "label": "S1",
          "round": 1,
          "note": "Pose · F19",
          "src": "assets/media/img/bd873acebe29b24e47d3-w720.jpg"
        },
        {
          "index": 2,
          "short_label": "S2",
          "label": "S2",
          "round": 2,
          "note": "Smile · F12",
          "src": "assets/media/img/4b47e8bee6ca5d42edd6-w720.jpg"
        },
        {
          "index": 3,
          "short_label": "S3",
          "label": "S3 (Final)",
          "round": 4,
          "note": "Fill Light · F29",
          "src": "assets/media/img/24b02cbec809da0b8cf7-w720.jpg"
        }
      ],
      "rounds": [
        {
          "round": 1,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 0,
          "state_out": 1,
          "family": "pose",
          "adapter_label": "Pose LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F19",
          "selected_frame_idx": 19,
          "step_short": "Pose",
          "step_pill": "F19 ✓",
          "badge": "Accepted · F19",
          "action_id": "pose.open(\"The person brings their own right hand inward toward their body until the entire relaxed hand is comfortably inside the image-left edge, keeping the hand raised and the torso, head, and other arm unchanged.\")",
          "action_chip": "pose.open(\"Bring raised right hand inward inside left frame edge\")",
          "planner_diag": "The raised right hand is clipped at the image-left edge. Fix hand placement first before adjusting expression and eye-socket lighting.",
          "checklist_state": [
            "active",
            "pending",
            "pending"
          ],
          "coarse_reason": "",
          "verdict_head": "Keep F19 as S1.",
          "verdict_body": "F19 places the relaxed right hand comfortably inside the left edge while keeping identity, expression, and background intact; F29–F38 bend the arm too far inward.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/8681153f51f9090c9b6c-w420.jpg",
              "src_hi": "assets/media/img/8681153f51f9090c9b6c-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/0c849cf9388e6b062e49-w420.jpg",
              "src_hi": "assets/media/img/0c849cf9388e6b062e49-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Enters edge",
              "raw_note": "The subject's raised right hand moves inward from the image-left edge and becomes fully visible, while the head, torso, opposite arm, expression, and scene remain essentially unchanged."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/bd873acebe29b24e47d3-w420.jpg",
              "src_hi": "assets/media/img/bd873acebe29b24e47d3-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Ideal margin",
              "raw_note": "The raised right hand moves farther inward toward the body, with the fingers and hand clearly inside the image-left edge while retaining the raised gesture."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/4f15c521a459506999a6-w420.jpg",
              "src_hi": "assets/media/img/4f15c521a459506999a6-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Too inward",
              "raw_note": "The right hand moves substantially inward toward the shoulder, with a deeper arm bend than needed for the requested small adjustment."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/059b5dd88997ce9b4e71-w420.jpg",
              "src_hi": "assets/media/img/059b5dd88997ce9b4e71-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Over-bent",
              "raw_note": "The right hand remains far inward near the shoulder and the arm is held in an exaggerated bent position, beyond the requested comfortable margin."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/fef40f8490a86508a566.mp4",
          "raw_trace": {
            "last_round_review": "first round",
            "plan_step": "Resolve the right hand's cut at image-left by bringing the raised hand inward toward the body until the entire relaxed hand fits comfortably inside the unchanged frame.",
            "video_summary": "The subject's raised right hand moves inward from being cut off at image-left. It is fully inside by the middle of the video, reaches a natural position at F19, and then continues too far toward the shoulder.",
            "selector_reason": "F19 completes the requested hand adjustment with a natural raised gesture and a comfortable margin inside the image-left edge. The face, identity, expression, clothing, lighting, framing, background, and photographic texture remain intact, while later frames bend the arm too far inward.",
            "coarse_trajectory": "The ideal frame keeps the sunny environmental portrait and neutral expression unchanged while bringing the subject's raised right hand fully inside the image-left edge with a small, natural margin. From left to right, the hand moves progressively inward: it is cut off at F0, becomes fully visible by F10, moves comfortably toward the torso at F19, and then travels too far toward the shoulder by F29 and F38.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 2,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 1,
          "state_out": 2,
          "family": "expression",
          "adapter_label": "Expression LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": true,
          "refine_bracket": [
            10,
            19
          ],
          "selected_label": "F12",
          "selected_frame_idx": 12,
          "step_short": "Smile",
          "step_pill": "F12 ★",
          "badge": "Accepted · F12",
          "action_id": "expression.open(\"The person gently lifts both mouth corners into a slight closed-mouth smile, keeping the eyes, gaze, jaw, head position, and facial structure unchanged.\")",
          "action_chip": "expression.open(\"Gently lift both mouth corners into a slight closed-mouth smile\")",
          "planner_diag": "Hand clipping is resolved (S1). The level mouth still reads reserved—add a subtle closed-mouth smile while preserving gaze and facial structure.",
          "checklist_state": [
            "done",
            "active",
            "pending"
          ],
          "coarse_reason": "F10 begins the subtle smile, while F19 is already stronger than requested. Sample 3 in-between frames on [F10–F19] from the same rollout.",
          "verdict_head": "Keep F12 as S2.",
          "verdict_body": "Fine sampling between F10 and F19 pinpoints F12—warm, naturally lifted corners with closed lips, avoiding the stronger cheek lift seen from F15 onward.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/bd873acebe29b24e47d3-w420.jpg",
              "src_hi": "assets/media/img/bd873acebe29b24e47d3-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/946c1e2cfd85b5413f4b-w420.jpg",
              "src_hi": "assets/media/img/946c1e2cfd85b5413f4b-w720.jpg",
              "chosen": false,
              "in_bracket": true,
              "is_new": false,
              "tag": "Subtle lift",
              "raw_note": "Both mouth corners lift slightly into a closed-mouth smile."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/0794a702907a42252ea7-w420.jpg",
              "src_hi": "assets/media/img/0794a702907a42252ea7-w720.jpg",
              "chosen": false,
              "in_bracket": true,
              "is_new": false,
              "tag": "Stronger",
              "raw_note": "The closed-mouth smile is more clearly formed, with some lift in the cheeks."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/c96bc1e4e9b2fb695268-w420.jpg",
              "src_hi": "assets/media/img/c96bc1e4e9b2fb695268-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Cheeks lift",
              "raw_note": "The smile becomes more pronounced, with greater cheek lift and narrower-looking eyes."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/f7643e999e7d8892c8fd-w420.jpg",
              "src_hi": "assets/media/img/f7643e999e7d8892c8fd-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Too strong",
              "raw_note": "A pronounced closed-mouth smile holds, similar to F29."
            }
          ],
          "refine_frames": [
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/946c1e2cfd85b5413f4b-w420.jpg",
              "src_hi": "assets/media/img/946c1e2cfd85b5413f4b-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Subtle lift",
              "raw_note": "Both mouth corners lift into a clearly visible, relaxed closed-mouth smile while the hand and framing remain in place."
            },
            {
              "label": "F12",
              "frame_index": 12,
              "src": "assets/media/img/4b47e8bee6ca5d42edd6-w420.jpg",
              "src_hi": "assets/media/img/4b47e8bee6ca5d42edd6-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": true,
              "tag": "Gentle smile",
              "raw_note": "The slight closed-mouth smile becomes a little more defined and warm, with the gaze, jaw, head position, and hand unchanged."
            },
            {
              "label": "F15",
              "frame_index": 15,
              "src": "assets/media/img/0cc6cda4685b1c6d1cd5-w420.jpg",
              "src_hi": "assets/media/img/0cc6cda4685b1c6d1cd5-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": true,
              "tag": "Fuller smile",
              "raw_note": "The mouth corners remain lifted in a natural closed-mouth smile, slightly stronger than F12."
            },
            {
              "label": "F17",
              "frame_index": 17,
              "src": "assets/media/img/7b5f9f8e48e9e58d2509-w420.jpg",
              "src_hi": "assets/media/img/7b5f9f8e48e9e58d2509-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": true,
              "tag": "Expressive",
              "raw_note": "The closed-mouth smile is maintained with a modestly more expressive lift at both corners."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/0794a702907a42252ea7-w420.jpg",
              "src_hi": "assets/media/img/0794a702907a42252ea7-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Too strong",
              "raw_note": "The smile remains clearly present and closed-mouth, approaching a somewhat more pronounced expression than the requested subtle amount."
            }
          ],
          "video": "assets/media/vid/dff616d84e81d14fb209.mp4",
          "raw_trace": {
            "last_round_review": "The pose video performed the requested hand adjustment successfully. Frame F19 placed the subject's own right hand fully inside image-left with a natural raised gesture, while later frames pulled the arm too far inward. The accepted frame preserved identity, expression, clothing, framing, lighting, and scene, so the hand step is complete and the plan should proceed to the requested smile.",
            "plan_step": "The nearly level closed mouth makes the sunny portrait feel reserved; gently lift both mouth corners into a slight closed-mouth smile to add warmth while keeping the gaze, jaw, facial structure, and natural character intact.",
            "video_summary": "The subject's neutral mouth gradually becomes a gentle closed-mouth smile beginning around F10. The smile holds naturally through the later frames and becomes slightly more pronounced toward the end, without visible changes to the hand, gaze, pose, scene, or facial identity.",
            "selector_reason": "F12 gives the requested subtle warmth with both mouth corners visibly lifted while keeping the lips closed and preserving the subject's reserved character. It is more aesthetically pleasing than CURRENT and avoids the slightly stronger expression seen later in the video.",
            "coarse_trajectory": "The ideal frame has a small, relaxed closed-mouth smile that adds warmth while keeping the subject’s gaze, facial structure, and reserved character intact. The smile grows from a subtle lift at F10 to a more pronounced smile by F19, then becomes stronger through F29 and F38; the requested change is visible throughout the sequence.",
            "refine_trajectory": "The ideal frame keeps the successful inward hand position and unchanged sunny portrait while adding only a gentle, closed-mouth smile with both corners subtly lifted and the eyes, gaze, facial structure, and texture preserved. From left to right the mouth changes from neutral to increasingly lifted; the requested smile is clearly established by F10 and remains natural through F19, with the later frames becoming slightly more pronounced."
          }
        },
        {
          "round": 3,
          "is_stop": false,
          "accepted": false,
          "outcome": "not_performed",
          "state_in": 2,
          "state_out": 2,
          "family": "light",
          "adapter_label": "Lighting LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F0",
          "selected_frame_idx": 0,
          "step_short": "Fill",
          "step_pill": "F0 ✕",
          "badge": "Rejected (not_performed) → F0",
          "action_id": "light.fill(direction=stronger)",
          "action_chip": "light.fill(direction=stronger)",
          "planner_diag": "Pose and slight smile are complete (S2). Strong sunlight leaves the eye sockets behind the glasses dark—request gentle near-lens fill.",
          "checklist_state": [
            "done",
            "done",
            "rejected"
          ],
          "coarse_reason": "",
          "verdict_head": "Reject → Retain S2 (F0).",
          "verdict_body": "None of the simulated frames visibly opens the shadows beneath the glasses. Selector keeps S2 cleanly so the Planner can diagnose the stall and retry.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/4b47e8bee6ca5d42edd6-w420.jpg",
              "src_hi": "assets/media/img/4b47e8bee6ca5d42edd6-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/9e0947069ecd51c41a84-w420.jpg",
              "src_hi": "assets/media/img/9e0947069ecd51c41a84-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "No lift",
              "raw_note": "Negligible facial rendering variation; the eye sockets and shadows beneath the glasses remain essentially as dark as CURRENT."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/e0eddfcd70223c79c4d0-w420.jpg",
              "src_hi": "assets/media/img/e0eddfcd70223c79c4d0-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Nearly flat",
              "raw_note": "The slight smile, gaze, raised hand, and framing remain stable. There is no clearly visible opening of the eye shadows or improvement in eye detail."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/f47578b9f54fbd23794d-w420.jpg",
              "src_hi": "assets/media/img/f47578b9f54fbd23794d-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Still dark",
              "raw_note": "Small tonal variations do not visibly reduce facial shadow contrast. The glasses and eye sockets retain the same dark appearance."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/2a2b1bbb74c7b4d8bc1e-w420.jpg",
              "src_hi": "assets/media/img/2a2b1bbb74c7b4d8bc1e-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Unchanged",
              "raw_note": "The final frame remains close to CURRENT, with the same strong sunlight and persistent eye-socket shadows rather than a clearly added soft fill."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/845fce15d273d586fdca.mp4",
          "raw_trace": {
            "last_round_review": "The last round successfully added the requested slight closed-mouth smile. The eyes, gaze, hand position, identity, framing, clothing, scene, and photographic texture stayed intact, so the remaining requested improvement is the soft fill in the eye sockets.",
            "plan_step": "Strong sunlight leaves the eye sockets beneath the glasses too dark; increase fill slightly from near the lens, with the visible result being clearer eye detail and softer facial shadow while the sunlight direction and sunny mood remain intact.",
            "video_summary": "The video holds the accepted pose, smile, framing, and sunny lighting nearly constant. It does not visibly add enough fill to open the eye sockets or reveal clearer eye detail.",
            "selector_reason": "Keep CURRENT because none of the generated frames clearly performs the requested lighting edit or visibly improves the portrait. The face close-ups retain sharp features and the same identity, without obvious blur or distortion; the smile, gaze, hand, scene, skin color, and glasses reflections remain stable. There is no excessive brightening or flattening, but there is also no meaningful shadow lift. The neighboring frames are too similar to justify refinement.",
            "coarse_trajectory": "The ideal frame would gently open the shadows beneath the glasses, revealing clearer eye detail while preserving facial modeling, the accepted smile and hand position, and the sunny setting. Across this sheet, the portrait remains nearly unchanged: the eye sockets stay dark and the facial shadows retain essentially the same contrast, with no clear progression toward stronger fill.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 4,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 2,
          "state_out": 3,
          "family": "light",
          "adapter_label": "Lighting LoRA",
          "seed": 43,
          "retry_note": "Both eye sockets beneath the glasses have visibly brighter shadow detail from soft near-lens fill, while sunlit skin and background retain their existing brightness.",
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F29",
          "selected_frame_idx": 29,
          "step_short": "Retry",
          "step_pill": "F29 ✓",
          "badge": "Accepted · F29",
          "action_id": "light.fill(direction=stronger)+note(\"Both eye sockets beneath the glasses have visibly brighter shadow detail from soft near-lens fill, while sunlit skin and background retain their existing brightness.\")",
          "action_chip": "light.fill(direction=stronger)",
          "planner_diag": "Round 3 preserved S2 cleanly but did not visibly lift eye-socket shadows. Retry fill light with incremented seed (43) and an explicit target retry_note.",
          "checklist_state": [
            "done",
            "done",
            "retry"
          ],
          "coarse_reason": "",
          "verdict_head": "Keep F29 as S3.",
          "verdict_body": "F29 visibly reveals eye detail beneath the glasses while retaining natural sunlit modeling, glasses reflections, and the earlier pose and smile edits.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/4b47e8bee6ca5d42edd6-w420.jpg",
              "src_hi": "assets/media/img/4b47e8bee6ca5d42edd6-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/fada2b7515a3be14713c-w420.jpg",
              "src_hi": "assets/media/img/fada2b7515a3be14713c-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Tiny lift",
              "raw_note": "Facial shadows are only marginally lighter, with no readily visible improvement in eye detail. The smile, hand, glasses, clothing, and background remain stable."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/7ce72548fce9d8540dfd-w420.jpg",
              "src_hi": "assets/media/img/7ce72548fce9d8540dfd-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Opening up",
              "raw_note": "A modest lift beneath the glasses and across the shaded face begins to reveal more eye detail. Strong sunlight and natural facial modeling remain evident."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/24b02cbec809da0b8cf7-w420.jpg",
              "src_hi": "assets/media/img/24b02cbec809da0b8cf7-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Clear eyes",
              "raw_note": "Both eye sockets have a small but visible shadow lift, making the eyes easier to read without eliminating the glasses shadows. The accepted expression and hand position remain stable, and facial features stay sharp."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/4ff39f89ed1d5370bef2-w420.jpg",
              "src_hi": "assets/media/img/4ff39f89ed1d5370bef2-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Flatter face",
              "raw_note": "The soft shadow lift holds at approximately the F29 level, with slightly more general facial brightness but little additional eye detail. Identity, expression, pose, framing, and scene remain consistent."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/c220d66dba8d355bc3a0.mp4",
          "raw_trace": {
            "last_round_review": "The last video preserved the accepted hand position, slight smile, identity, framing, and scene, but did not visibly lift the shadows around the eyes. CURRENT was correctly retained. Retry the fill step once with a clearer target for visible eye-socket shadow detail while preserving the existing sunlight and background brightness.",
            "plan_step": "Resolve the dark eye sockets beneath the glasses with a small amount of soft near-lens fill, producing visibly clearer eye detail while retaining the existing sunlight, facial modeling, and background brightness.",
            "video_summary": "The video gradually adds a restrained fill to the shaded face, producing a modest visible improvement beneath the glasses by F29 and then largely holding. The accepted smile, inward hand position, camera framing, and sunny scene remain stable.",
            "selector_reason": "F29 provides the requested small improvement in eye visibility while retaining natural shadow and the sunny character. The close-up shows sharp eyes and mouth, preserved facial structure and skin texture, and no conspicuous change to glasses reflections or skin color. The sunlit highlights and background remain consistent, without excessive flattening or visible beauty retouching. Later frames offer no meaningful additional benefit, so refinement is unnecessary.",
            "coarse_trajectory": "The ideal frame adds a small, visible lift to both eye sockets beneath the glasses while preserving the slight smile, inward hand position, facial texture, sunlight, and scene. Shadow detail gradually opens through the middle and later frames, with little additional benefit between F29 and F38; the pose and composition remain stable.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 5,
          "is_stop": true,
          "accepted": false,
          "outcome": "stop",
          "state_in": 3,
          "state_out": 3,
          "family": "stop",
          "adapter_label": "Action LoRA",
          "seed": null,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "",
          "selected_frame_idx": null,
          "step_short": "Stop",
          "step_pill": "planner_stop",
          "badge": "planner_stop",
          "action_id": "",
          "action_chip": "planner_stop (deliver S3)",
          "planner_diag": "The fill retry brightened both eye sockets while preserving sunlight, pose, smile, and identity. All three requested edits are complete.",
          "checklist_state": [
            "done",
            "done",
            "done"
          ],
          "coarse_reason": "",
          "verdict_head": "Terminate via planner_stop.",
          "verdict_body": "All requested edits verified across the portrait; SimShoot stops voluntarily and delivers S3.",
          "coarse_frames": [],
          "refine_frames": [],
          "video": null,
          "raw_trace": {
            "last_round_review": "The fill retry worked: it modestly brightened the eye sockets beneath the glasses while preserving the sunny light, accepted smile, hand position, identity, and scene. The requested edits are complete.",
            "plan_step": "",
            "video_summary": "",
            "selector_reason": "",
            "coarse_trajectory": "",
            "refine_trajectory": ""
          }
        }
      ],
      "final_summary": {
        "decision_badge": "planner_stop · 3/3 edits verified",
        "decision_tone": "ok",
        "headline": "Reshoot complete — voluntary stop.",
        "rationale": "The Round 4 fill retry brightened both eye sockets while keeping natural sunlight, glasses reflections, hand framing, and smile intact. In Round 5, the Planner verifies all three edits and terminates voluntarily, delivering S3.",
        "checklist_state": [
          "done",
          "done",
          "done"
        ],
        "before_src": "assets/media/img/8681153f51f9090c9b6c-w720.jpg",
        "after_src": "assets/media/img/24b02cbec809da0b8cf7-w720.jpg",
        "final_label": "S3"
      }
    },
    {
      "case_id": "05541",
      "display_id": "Case 3",
      "track_label": "Targeted",
      "role_badge": "3 Valid Edits · Pose + Smile + Reframe · planner_stop",
      "short_label": "Lakeside Portrait",
      "stop_reason": "planner_stop",
      "headline": "Clean 3-edit lakeside rescue: head tilt, relaxed closed-lip smile, and refined vertical reframing",
      "summary": "Rescues an off-balance lakeside snapshot across three zero-rejection rounds: understated head tilt (R1 F29), relaxed closed-lip smile (R2 F29), coarse-to-fine vertical reframing on [F10–F19] → F17 to trim excess overhead canopy (R3), and voluntary <code>planner_stop</code> (R4).",
      "goal_items": [
        {
          "id": "pose",
          "num": "01",
          "family": "pose",
          "title": "Gentle head tilt left",
          "detail": "Tilt head slightly toward her left shoulder while keeping torso still."
        },
        {
          "id": "expression",
          "num": "02",
          "family": "expression",
          "title": "Relaxed closed-lip smile",
          "detail": "Lift both mouth corners subtly into a warm, natural smile."
        },
        {
          "id": "camera",
          "num": "03",
          "family": "camera",
          "title": "Trim excess overhead canopy",
          "detail": "Shift framing downward slightly for balanced lakeside headroom."
        }
      ],
      "states": [
        {
          "index": 0,
          "short_label": "S0",
          "label": "S0 (Input)",
          "round": 0,
          "note": "Original portrait",
          "src": "assets/media/img/8d47990d1a2b5757e58d-w720.jpg"
        },
        {
          "index": 1,
          "short_label": "S1",
          "label": "S1",
          "round": 1,
          "note": "Head Tilt · F29",
          "src": "assets/media/img/15ed0865b10eeaa0aee5-w720.jpg"
        },
        {
          "index": 2,
          "short_label": "S2",
          "label": "S2",
          "round": 2,
          "note": "Smile · F29",
          "src": "assets/media/img/264816558291f59f2b73-w720.jpg"
        },
        {
          "index": 3,
          "short_label": "S3",
          "label": "S3 (Final)",
          "round": 3,
          "note": "Reframe · F17",
          "src": "assets/media/img/dde1b39f7452ec58930b-w720.jpg"
        }
      ],
      "rounds": [
        {
          "round": 1,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 0,
          "state_out": 1,
          "family": "pose",
          "adapter_label": "Pose LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F29",
          "selected_frame_idx": 29,
          "step_short": "Head Tilt",
          "step_pill": "F29 ✓",
          "badge": "Accepted · F29",
          "action_id": "pose.head_tilt(side=left)",
          "action_chip": "pose.head_tilt(side=left)",
          "planner_diag": "Her head sits stiffly upright. Apply a subtle, natural tilt toward her left shoulder first while keeping shoulders, torso, and framing steady.",
          "checklist_state": [
            "active",
            "pending",
            "pending"
          ],
          "coarse_reason": "",
          "verdict_head": "Keep F29 as S1.",
          "verdict_body": "F29 delivers a clear yet understated head tilt with stable shoulders, crisp eyes, and natural hair motion; F38 tilts further than needed.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/8d47990d1a2b5757e58d-w420.jpg",
              "src_hi": "assets/media/img/8d47990d1a2b5757e58d-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/b5d97e91b95c75ed2c84-w420.jpg",
              "src_hi": "assets/media/img/b5d97e91b95c75ed2c84-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Barely tilted",
              "raw_note": "The head moves slightly toward her left shoulder, but the tilt remains barely apparent. Her expression, shoulders and surroundings remain stable, and the face retains clear detail."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/1460520f04c2acfdc8be-w420.jpg",
              "src_hi": "assets/media/img/1460520f04c2acfdc8be-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Modest tilt",
              "raw_note": "A modest tilt toward image-right is visible in the eye line and head angle. Her gaze and existing closed-mouth expression remain natural, with facial features, hair and clothing preserved."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/15ed0865b10eeaa0aee5-w420.jpg",
              "src_hi": "assets/media/img/15ed0865b10eeaa0aee5-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Gentle tilt",
              "raw_note": "The head has a clear, gentle tilt toward her own left shoulder, giving the portrait a more relaxed feeling. The torso and shoulders remain still, and the close-up preserves sharp eyes, recognizable facial structure and photographic skin texture."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/c31ec525fe15687828a9-w420.jpg",
              "src_hi": "assets/media/img/c31ec525fe15687828a9-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Stronger tilt",
              "raw_note": "The requested tilt becomes slightly stronger than at F29 while retaining her gaze, expression and identity. Hair follows the head naturally, with no conspicuous redrawing, facial distortion or change to the scene."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/4b8763bafbcba2e3712f.mp4",
          "raw_trace": {
            "last_round_review": "first round",
            "plan_step": "The nearly upright head lacks the requested tilt; lean it gently toward her own left shoulder for a subtle, natural angle while keeping the torso still.",
            "video_summary": "The video gradually tilts her head toward her own left shoulder, with the requested movement clearly established by the middle and increasing through the end. The shoulders, torso, framing, lighting and lakeside setting remain stable.",
            "selector_reason": "F29 provides the most natural amount of the requested tilt: clearly visible but still understated. The face close-up retains her identity, facial proportions, sharp features and skin texture; there is no excessive tilt, torso turn, conspicuous expression change, redrawn hair or facial softening. F38 is also usable, but its stronger angle is less subtle, and the neighboring frames are similar enough that refinement is unnecessary.",
            "coarse_trajectory": "The ideal frame has a gentle ear-to-shoulder tilt toward her own left, image-right, while preserving her facial structure, gaze, expression, shoulders, clothing, framing and lakeside setting. Across the sheet, the head gradually tilts in the requested direction, becoming clearly readable at F19 and comfortably relaxed at F29; F38 increases the tilt slightly further.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 2,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 1,
          "state_out": 2,
          "family": "expression",
          "adapter_label": "Expression LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "F29",
          "selected_frame_idx": 29,
          "step_short": "Smile",
          "step_pill": "F29 ✓",
          "badge": "Accepted · F29",
          "action_id": "expression.open(\"The person lifts both mouth corners slightly into a relaxed closed-lip smile, keeping the jaw relaxed and the eyes, brows and gaze unchanged.\")",
          "action_chip": "expression.open(\"Lift both mouth corners into a relaxed closed-lip smile\")",
          "planner_diag": "Head tilt succeeded (S1), while her expression remains reserved. Lift both mouth corners gently into a relaxed closed-lip smile.",
          "checklist_state": [
            "done",
            "active",
            "pending"
          ],
          "coarse_reason": "",
          "verdict_head": "Keep F29 as S2.",
          "verdict_body": "F29 achieves a warm, natural closed-lip smile while keeping her jaw relaxed, head tilt intact, and facial features razor-sharp; F38 adds no further gain.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/15ed0865b10eeaa0aee5-w420.jpg",
              "src_hi": "assets/media/img/15ed0865b10eeaa0aee5-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/822134cb4e369885260c-w420.jpg",
              "src_hi": "assets/media/img/822134cb4e369885260c-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Slight warmth",
              "raw_note": "Both mouth corners rise slightly, giving her expression a little more warmth. Lips remain closed, with minimal cheek movement and the existing head tilt preserved."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/947b5d6054a93e698818-w420.jpg",
              "src_hi": "assets/media/img/947b5d6054a93e698818-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Gentle smile",
              "raw_note": "A clear, gentle closed-lip smile appears with a small natural cheek lift. Her eyes remain open and detailed, with gaze, brows and facial proportions preserved."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/264816558291f59f2b73-w420.jpg",
              "src_hi": "assets/media/img/264816558291f59f2b73-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": false,
              "tag": "Relaxed smile",
              "raw_note": "The mouth corners lift a little further into a warm, relaxed smile with subtle cheek creases. The jaw stays relaxed, lips stay closed, and the accepted head tilt, eye openings and gaze remain consistent."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/cbf3c5f5a9689651026f-w420.jpg",
              "src_hi": "assets/media/img/cbf3c5f5a9689651026f-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Holds smile",
              "raw_note": "The smile holds close to F29, with slightly more pronounced cheek creasing. Identity, facial detail, head tilt, clothing, framing and illumination remain consistent."
            }
          ],
          "refine_frames": [],
          "video": "assets/media/vid/26155af1f3e63b31786b.mp4",
          "raw_trace": {
            "last_round_review": "The video performed the requested head tilt toward her own left shoulder while keeping the shoulders, torso and lakeside composition stable. The accepted frame gives a gentle, natural angle without an obvious change in identity, facial texture or expression. The head-tilt step is complete; preserve it during the smile and framing edits.",
            "plan_step": "The mouth remains more reserved than requested; lift both mouth corners slightly into a relaxed closed-lip smile for a warmer expression that retains her character.",
            "video_summary": "The video gradually raises both mouth corners into a relaxed closed-lip smile, clearly established by the midpoint and nearly settled by F29. It preserves the previously accepted head tilt and shows no visible teeth, conspicuous facial softening, or material changes to gaze, pose, framing or lighting.",
            "selector_reason": "F29 provides the best balance of warmth and restraint: its smile is clearly more welcoming than CURRENT without becoming a generic grin. The face close-up retains sharp eyes and mouth contours, recognizable facial structure and natural texture. F38 offers no meaningful further improvement, so refinement is unnecessary.",
            "coarse_trajectory": "The ideal frame has a modest, relaxed closed-lip smile with slightly raised mouth corners and cheeks, while preserving her accepted head tilt, facial structure, gaze, texture and lakeside setting. The smile develops gradually from F10 through F29 and then largely holds through F38; the framing, lighting and body position remain stable.",
            "refine_trajectory": ""
          }
        },
        {
          "round": 3,
          "is_stop": false,
          "accepted": true,
          "outcome": "accepted",
          "state_in": 2,
          "state_out": 3,
          "family": "camera",
          "adapter_label": "Translate LoRA",
          "seed": 42,
          "retry_note": null,
          "refined": true,
          "refine_bracket": [
            10,
            19
          ],
          "selected_label": "F17",
          "selected_frame_idx": 17,
          "step_short": "Reframe",
          "step_pill": "F17 ★",
          "badge": "Accepted · F17",
          "action_id": "camera.reframe_y(direction=image_up)",
          "action_chip": "camera.reframe_y(direction=image_up)",
          "planner_diag": "Pose and smile are complete (S2), leaving excess tree canopy and sky overhead. Reframe slightly upward to balance the lakeside composition.",
          "checklist_state": [
            "done",
            "done",
            "active"
          ],
          "coarse_reason": "F10 barely moves the framing (~3%), while F19 already shifts ~15% and slightly reduces head tilt. Refine [F10–F19] from the same rollout.",
          "verdict_head": "Keep F17 as S3.",
          "verdict_body": "Fine sampling selects F17—trimming overhead canopy cleanly with comfortable headroom while preserving subject scale, head tilt, and smile.",
          "coarse_frames": [
            {
              "label": "F0",
              "frame_index": 0,
              "src": "assets/media/img/264816558291f59f2b73-w420.jpg",
              "src_hi": "assets/media/img/264816558291f59f2b73-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Current",
              "raw_note": "Unchanged round-start portrait (CURRENT)."
            },
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/5386c0f954ea7ab090c7-w420.jpg",
              "src_hi": "assets/media/img/5386c0f954ea7ab090c7-w720.jpg",
              "chosen": false,
              "in_bracket": true,
              "is_new": false,
              "tag": "Too subtle",
              "raw_note": "She sits approximately 3% higher at essentially the same scale, with slightly less overhead scenery and more coat visible below. Her accepted smile, head tilt, direct gaze and facial detail remain consistent."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/7e0b2c00054088bf1cd8-w420.jpg",
              "src_hi": "assets/media/img/7e0b2c00054088bf1cd8-w720.jpg",
              "chosen": false,
              "in_bracket": true,
              "is_new": false,
              "tag": "Strong shift",
              "raw_note": "She is approximately 15% higher and slightly farther toward image-right, revealing considerably more torso. The face remains recognizable and sharp, although the accepted head tilt appears slightly reduced."
            },
            {
              "label": "F29",
              "frame_index": 29,
              "src": "assets/media/img/100efdc9cdac274fb4d9-w420.jpg",
              "src_hi": "assets/media/img/100efdc9cdac274fb4d9-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Too high",
              "raw_note": "She moves approximately 30% higher and noticeably toward image-right, producing a substantially different composition with much more lower coat visible. Her head is more upright, while the smile and recognizable facial features remain."
            },
            {
              "label": "F38",
              "frame_index": 38,
              "src": "assets/media/img/2f3359072710ca400a28-w420.jpg",
              "src_hi": "assets/media/img/2f3359072710ca400a28-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Tight headroom",
              "raw_note": "She ends approximately 36% higher and considerably farther toward image-right, with limited headroom and newly visible lower clothing and a stone edge. The head tilt is reduced; the face remains clear, and the revealed clothing and lake reflections show no obvious deformation."
            }
          ],
          "refine_frames": [
            {
              "label": "F10",
              "frame_index": 10,
              "src": "assets/media/img/5386c0f954ea7ab090c7-w420.jpg",
              "src_hi": "assets/media/img/5386c0f954ea7ab090c7-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Tiny shift",
              "raw_note": "A small upward shift reduces some overhead scenery; her size and horizontal position stay nearly the same."
            },
            {
              "label": "F12",
              "frame_index": 12,
              "src": "assets/media/img/22e76092d9fd661c13ed-w420.jpg",
              "src_hi": "assets/media/img/22e76092d9fd661c13ed-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": true,
              "tag": "Slight lift",
              "raw_note": "She shifts farther upward, with less canopy and sky above her."
            },
            {
              "label": "F15",
              "frame_index": 15,
              "src": "assets/media/img/b2412f4e925e6cb4723e-w420.jpg",
              "src_hi": "assets/media/img/b2412f4e925e6cb4723e-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": true,
              "tag": "Clear shift",
              "raw_note": "A clear upward shift reduces the overhead scenery while retaining comfortable headroom."
            },
            {
              "label": "F17",
              "frame_index": 17,
              "src": "assets/media/img/dde1b39f7452ec58930b-w420.jpg",
              "src_hi": "assets/media/img/dde1b39f7452ec58930b-w720.jpg",
              "chosen": true,
              "in_bracket": false,
              "is_new": true,
              "tag": "Balanced crop",
              "raw_note": "She moves upward by a moderate amount, reducing the canopy and sky while keeping her scale and horizontal placement."
            },
            {
              "label": "F19",
              "frame_index": 19,
              "src": "assets/media/img/7e0b2c00054088bf1cd8-w420.jpg",
              "src_hi": "assets/media/img/7e0b2c00054088bf1cd8-w720.jpg",
              "chosen": false,
              "in_bracket": false,
              "is_new": false,
              "tag": "Stronger shift",
              "raw_note": "The upward shift is strongest in this sheet, with substantially less space above her and more of the lower scene visible."
            }
          ],
          "video": "assets/media/vid/d08b770bd8f1aa144989.mp4",
          "raw_trace": {
            "last_round_review": "The expression edit raised both mouth corners into a modest closed-lip smile while retaining the accepted tilt toward her own left shoulder. The selected frame preserves her recognizable facial structure, engaged gaze and natural texture without visible teeth or an exaggerated grin. Pose and expression are complete; only the requested reduction of overhead scenery remains.",
            "plan_step": "Excess canopy and sky remain above the subject; use a small upward reframe of the subject, the closest available approximation to a downward camera tilt, to reduce overhead scenery while preserving subject size and her place beside the lake.",
            "video_summary": "The subject moves steadily upward in the image, reducing the canopy and sky overhead while keeping her size and horizontal placement stable. The accepted smile and head tilt remain visible.",
            "selector_reason": "F17 gives a clear, moderate reduction in overhead scenery that fits the requested shift while preserving comfortable headroom, the subject's scale, and her accepted expression and tilt. F19 moves her farther than needed; F17 is the more balanced composition.",
            "coarse_trajectory": "The ideal frame places her roughly 5–10% higher at the same scale, reducing overhead scenery while preserving her relaxed smile, gentle head tilt, sharp facial detail and lakeside setting. The subject moves progressively upward across the sheet, with increasing movement toward image-right in the later frames. F10 is short of the intended adjustment, while F19 and subsequent frames exceed it.",
            "refine_trajectory": "The ideal frame shifts her upward by about 5–10% of the image height, reducing the canopy and sky while keeping her scale, accepted smile and head tilt, and comfortable headroom. From F10 to F19, she moves progressively higher in the frame as more of the lower scene is revealed; the requested reframe is visible throughout and grows strongest toward F19."
          }
        },
        {
          "round": 4,
          "is_stop": true,
          "accepted": false,
          "outcome": "stop",
          "state_in": 3,
          "state_out": 3,
          "family": "stop",
          "adapter_label": "Action LoRA",
          "seed": null,
          "retry_note": null,
          "refined": false,
          "refine_bracket": null,
          "selected_label": "",
          "selected_frame_idx": null,
          "step_short": "Stop",
          "step_pill": "planner_stop",
          "badge": "planner_stop",
          "action_id": "",
          "action_chip": "planner_stop (deliver S3)",
          "planner_diag": "Vertical placement is balanced at F17 with the accepted head tilt and relaxed smile intact. All three edits are complete.",
          "checklist_state": [
            "done",
            "done",
            "done"
          ],
          "coarse_reason": "",
          "verdict_head": "Terminate via planner_stop.",
          "verdict_body": "All requested edits verified; SimShoot stops voluntarily and delivers S3.",
          "coarse_frames": [],
          "refine_frames": [],
          "video": null,
          "raw_trace": {
            "last_round_review": "The last video moved the subject upward while largely retaining the background layout, so it approximated the requested downward tilt rather than reproducing a literal camera tilt. The selected F17 improves her vertical placement without the excessive displacement and newly revealed lower-body detail seen later in the video. Her accepted head tilt and relaxed smile remain visible. Further reframing would risk additional reconstruction without a reliable improvement.",
            "plan_step": "",
            "video_summary": "",
            "selector_reason": "",
            "coarse_trajectory": "",
            "refine_trajectory": ""
          }
        }
      ],
      "final_summary": {
        "decision_badge": "planner_stop · 3/3 edits verified",
        "decision_tone": "ok",
        "headline": "Reshoot complete — voluntary stop.",
        "rationale": "Round 3's refined vertical reframe at F17 trims excess overhead canopy and balances her placement beside the lake while preserving crisp facial identity, head tilt, and relaxed smile. In Round 4, the Planner verifies all three edits and terminates voluntarily, delivering S3.",
        "checklist_state": [
          "done",
          "done",
          "done"
        ],
        "before_src": "assets/media/img/8d47990d1a2b5757e58d-w720.jpg",
        "after_src": "assets/media/img/dde1b39f7452ec58930b-w720.jpg",
        "final_label": "S3"
      }
    }
  ]
};
