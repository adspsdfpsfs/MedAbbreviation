import { MedicalTerm } from '../types';

export const MEDICAL_DATA: MedicalTerm[] = [
  // --- Ortho & Trauma ---
  { id: '1', abbr: 'ORIF', full_name: 'Open Reduction and Internal Fixation', chinese: '切开复位内固定术', category: 'Ortho', layman_term: '手术切开皮肤，把断掉的骨头拼好 (Reduction)，然后用钢板、螺丝或钉子固定住 (Fixation)。' },
  { id: '2', abbr: 'NOF', full_name: 'Neck of Femur', chinese: '股骨颈', category: 'Anatomy', layman_term: '大腿骨头连接屁股的那一截细细的“脖子” (Femoral Neck)，老年人摔跤特别容易断在这个位置。' },
  { id: '3', abbr: 'WBAT', full_name: 'Weight Bearing As Tolerated', chinese: '耐受范围内负重', category: 'Management', layman_term: '腿能使多大劲就使多大劲，如果疼就少踩点，不疼就正常踩 (Weight Bearing)。' },
  { id: '4', abbr: 'NWB', full_name: 'Non-Weight Bearing', chinese: '完全不负重', category: 'Management', layman_term: '这只脚完全不能沾地，不能受一点力 (Non-Weight Bearing)，得用拐杖或者助行器悬空走。' },
  { id: '5', abbr: 'TWB', full_name: 'Touch Weight Bearing', chinese: '触地负重 (仅脚尖点地)', category: 'Management', layman_term: '脚尖像踩鸡蛋一样轻轻点地，主要是为了维持平衡 (Balance)，不能真的用力踩下去。' },
  { id: '6', abbr: 'TKR', full_name: 'Total Knee Replacement', chinese: '全膝关节置换术', category: 'Ortho', layman_term: '膝盖磨损太厉害了，手术把坏掉的关节切掉，换成金属和塑料做的人工膝盖 (Artificial Knee)。' },
  { id: '7', abbr: 'THR', full_name: 'Total Hip Replacement', chinese: '全髋关节置换术', category: 'Ortho', layman_term: '胯骨轴（髋关节）坏了，手术换一套人工的球窝关节 (Artificial Hip)。' },
  { id: '8', abbr: 'MOI', full_name: 'Mechanism of Injury', chinese: '受伤机制', category: 'General', layman_term: '到底是怎么伤着的？比如是车祸 (MVA) 撞的，还是走路滑倒的 (Fall)，还是高处跳下来的。' },
  { id: '9', abbr: 'POP', full_name: 'Plaster of Paris', chinese: '石膏固定', category: 'Management', layman_term: '就是最传统的打石膏 (Cast)，用来固定骨折的地方不乱动。' },
  
  // --- General Medicine ---
  { id: '10', abbr: 'PMHx', full_name: 'Past Medical History', chinese: '既往病史', category: 'General', layman_term: '病人以前得过什么病，做过什么手术，有没有老毛病 (History)。' },
  { id: '11', abbr: 'T2DM', full_name: 'Type 2 Diabetes Mellitus', chinese: '2型糖尿病', category: 'Diagnosis', layman_term: '最常见的糖尿病类型，通常是成年后发病，和肥胖、遗传有关 (Insulin Resistance)。' },
  { id: '12', abbr: 'HTN', full_name: 'Hypertension', chinese: '高血压', category: 'Diagnosis', layman_term: '血压高了 (High Blood Pressure)，血管里的压力太大了。' },
  { id: '13', abbr: 'GORD', full_name: 'Gastro-Oesophageal Reflux Disease', chinese: '胃食管反流病', category: 'Diagnosis', layman_term: '胃酸往上反 (Reflux)，经常感觉烧心、反酸水。' },
  { id: '14', abbr: 'AF', full_name: 'Atrial Fibrillation', chinese: '心房颤动', category: 'Diagnosis', layman_term: '心跳乱套了 (Arrhythmia)，跳得忽快忽慢，不规律，像发抖一样。' },
  { id: '15', abbr: 'CHF', full_name: 'Congestive Heart Failure', chinese: '充血性心力衰竭', category: 'Diagnosis', layman_term: '心脏泵血没劲儿了，导致身体里（比如肺里或腿上）有积液 (Fluid Retention) 淤血。' },
  { id: '16', abbr: 'OSA', full_name: 'Obstructive Sleep Apnea', chinese: '阻塞性睡眠呼吸暂停', category: 'Diagnosis', layman_term: '睡觉打呼噜特别响，而且还会突然憋气 (Apnea)，喘不上来，容易缺氧。' },
  { id: '17', abbr: 'NKDA', full_name: 'No Known Drug Allergies', chinese: '无已知药物过敏', category: 'General', layman_term: '病人自己没说过，记录里也没发现他对什么药过敏 (Allergies)。' },
  
  // --- Management & Procedures ---
  { id: '18', abbr: 'NBM', full_name: 'Nil By Mouth', chinese: '禁食/禁水', category: 'Management', layman_term: '绝对不能吃东西，也不能喝水 (Fasting)，通常是为了做手术或检查。' },
  { id: '19', abbr: 'IVC', full_name: 'Intravenous Cannula', chinese: '静脉留置针', category: 'Procedure', layman_term: '手上扎的那个软管针 (Cannula)，用来输液的，不用每次都扎钢针。' },
  { id: '20', abbr: 'IDC', full_name: 'Indwelling Catheter', chinese: '留置导尿管', category: 'Procedure', layman_term: '插在尿道里的管子 (Catheter)，把尿直接引到袋子里，不用自己上厕所。' },
  { id: '21', abbr: 'IVABs', full_name: 'Intravenous Antibiotics', chinese: '静脉注射抗生素', category: 'Medication', layman_term: '输液打消炎药（抗生素 Antibiotics）。' },
  { id: '22', abbr: 'PCA', full_name: 'Patient Controlled Analgesia', chinese: '患者自控镇痛泵', category: 'Management', layman_term: '一个止痛药盒子 (Pump)，病人觉得疼了就自己按一下按钮加药，不用喊护士。' },
  { id: '23', abbr: 'SPC', full_name: 'Suprapubic Catheter', chinese: '耻骨上膀胱造瘘管', category: 'Procedure', layman_term: '因为尿道堵了或别的原因，直接在小肚子上打个洞插管子 (Catheter) 排尿。' },
  { id: '24', abbr: 'NGT', full_name: 'Nasogastric Tube', chinese: '鼻胃管', category: 'Procedure', layman_term: '从鼻孔插进去一根管子直通胃里 (Stomach)，用来喂饭或者把胃里的东西抽出来。' },
  
  // --- Admin ---
  { id: '25', abbr: 'T/LOS', full_name: 'Total Length of Stay', chinese: '总住院天数', category: 'General', layman_term: '一共住了几天院 (Hospital Stay)。' },
  { id: '26', abbr: 'EDD', full_name: 'Estimated Date of Discharge', chinese: '预计出院日期', category: 'General', layman_term: '医生估计哪天能回家 (Discharge)。' },
  { id: '27', abbr: 'D/C', full_name: 'Discharge', chinese: '出院', category: 'General', layman_term: '可以出院回家了 (Go Home)。' },
  { id: '28', abbr: 'R/V', full_name: 'Review', chinese: '复查/评估', category: 'Management', layman_term: '医生过来看一下情况，或者约好下次再来检查 (Check-up)。' },
  { id: '29', abbr: 'T/F', full_name: 'Transfer', chinese: '转运/转移', category: 'General', layman_term: '转到别的科室，或者转到别的医院去 (Transfer)。' },
  
  // --- Specifics ---
  { id: '30', abbr: 'SDH', full_name: 'Subdural Hematoma', chinese: '硬膜下血肿', category: 'Diagnosis', layman_term: '脑袋受到撞击后，脑膜下面出血积聚了 (Hematoma)，压迫脑组织。' },
  { id: '31', abbr: 'IHD', full_name: 'Ischemic Heart Disease', chinese: '缺血性心脏病', category: 'Diagnosis', layman_term: '心脏的血管（冠状动脉 Coronary Arteries）堵了或者窄了，心脏供血不足。' },
  { id: '32', abbr: 'CABG', full_name: 'Coronary Artery Bypass Graft', chinese: '冠状动脉搭桥术', category: 'Procedure', layman_term: '心脏搭桥手术 (Bypass)，从别的地方取根血管接在心脏上，绕过堵塞的地方供血。' },
  { id: '33', abbr: 'BPD', full_name: 'Borderline Personality Disorder', chinese: '边缘性人格障碍', category: 'Diagnosis', layman_term: '情绪非常不稳定，容易走极端 (Instability)，人际关系也很紧张。' },
  { id: '34', abbr: 'PTSD', full_name: 'Post-Traumatic Stress Disorder', chinese: '创伤后应激障碍', category: 'Diagnosis', layman_term: '经历过可怕的事情（如车祸、战争 Trauma）后留下的心理阴影，容易做噩梦、焦虑。' },
  { id: '35', abbr: 'MRSA', full_name: 'Methicillin-Resistant Staphylococcus Aureus', chinese: '耐甲氧西林金黄色葡萄球菌', category: 'Diagnosis', layman_term: '一种普通的抗生素杀不死的“超级细菌” (Superbug)，需要特殊的药。' },
  { id: '36', abbr: 'VRE', full_name: 'Vancomycin-Resistant Enterococcus', chinese: '耐万古霉素肠球菌', category: 'Diagnosis', layman_term: '另一种很难治的耐药细菌 (Resistant Bacteria)，普通抗生素不管用。' },
  { id: '37', abbr: 'NAD', full_name: 'No Abnormality Detected', chinese: '未发现异常', category: 'General', layman_term: '检查了一圈，看起来一切正常，没发现毛病 (Normal)。' },
  { id: '38', abbr: 'SOB', full_name: 'Shortness of Breath', chinese: '呼吸急促', category: 'Diagnosis', layman_term: '感觉喘不上气，气短 (Breathlessness)。' },
  { id: '39', abbr: 'UTI', full_name: 'Urinary Tract Infection', chinese: '尿路感染', category: 'Diagnosis', layman_term: '尿道发炎了 (Infection)，尿尿会痛或者总想尿。' },

  // --- NEW ADDITIONS ---
  { id: '40', abbr: '#', full_name: 'Fracture', chinese: '骨折', category: 'Diagnosis', layman_term: '骨头断了。在医学记录里，# 这个符号常代表骨折 (Fracture)。' },
  { id: '41', abbr: 'ARP', full_name: 'Acute Resuscitation Plan', chinese: '急性复苏计划', category: 'Management', layman_term: '如果病人突然不行了（心跳呼吸停了），我们要不要抢救 (Resuscitation)，怎么抢救的预案。' },
  { id: '42', abbr: 'ACAT', full_name: 'Aged Care Assessment Team', chinese: '老年护理评估小组', category: 'General', layman_term: '专门评估老人能不能自己在家住，还是需要去养老院 (Nursing Home) 的团队。' },
  { id: '43', abbr: 'ACL', full_name: 'Anterior Cruciate Ligament', chinese: '前交叉韧带', category: 'Anatomy', layman_term: '膝盖里面非常重要的一根韧带 (Ligament)，运动员急停转身时很容易断。' },
  { id: '44', abbr: 'APMS', full_name: 'Acute Pain Management Services', chinese: '急性疼痛管理服务', category: 'Management', layman_term: '专门负责管术后止疼 (Pain Relief) 或者剧烈疼痛的医生护士团队。' },
  { id: '45', abbr: 'ARF', full_name: 'Acute Renal Failure', chinese: '急性肾衰竭', category: 'Diagnosis', layman_term: '肾脏 (Kidney) 突然罢工不干活了，排不出毒素和尿了。' },
  { id: '46', abbr: 'BP', full_name: 'Blood Pressure', chinese: '血压', category: 'General', layman_term: '血压读数 (Pressure)。' },
  { id: '47', abbr: 'BGL', full_name: 'Blood Glucose Level', chinese: '血糖水平', category: 'General', layman_term: '血液里的糖分含量 (Sugar Level)，糖尿病病人要经常测。' },
  { id: '48', abbr: 'CCF', full_name: 'Congestive Cardiac Failure', chinese: '充血性心力衰竭', category: 'Diagnosis', layman_term: '心脏没劲儿了，泵不动血了，同 CHF (Heart Failure)。' },
  { id: '49', abbr: 'COAD', full_name: 'Chronic Obstructive Airways Disease', chinese: '慢性阻塞性气道疾病 (COPD)', category: 'Diagnosis', layman_term: '老慢支、肺气肿，气管堵了，长期咳嗽喘气费劲 (Lung Disease)。' },
  { id: '50', abbr: 'CRF', full_name: 'Chronic Renal Failure', chinese: '慢性肾衰竭', category: 'Diagnosis', layman_term: '肾病很久了，肾功能越来越差，可能需要透析 (Dialysis)。' },
  { id: '51', abbr: 'CVA', full_name: 'Cerebrovascular Accident', chinese: '脑血管意外 (中风)', category: 'Diagnosis', layman_term: '也就是中风 (Stroke)，可能是脑血管堵了（脑梗）或者破了（脑出血）。' },
  { id: '52', abbr: 'CXR', full_name: 'Chest X-Ray', chinese: '胸部 X 光片', category: 'Procedure', layman_term: '拍个胸片 (X-Ray)，看看肺和心脏有没有问题。' },
  { id: '53', abbr: 'DVT', full_name: 'Deep Vein Thrombosis', chinese: '深静脉血栓', category: 'Diagnosis', layman_term: '腿部深处的血管里长了血块 (Clot)，腿会肿痛，血块掉了很危险。' },
  { id: '54', abbr: 'ECG', full_name: 'Electrocardiogram', chinese: '心电图', category: 'Procedure', layman_term: '贴几个电极片在身上，看心脏跳动的波形图 (Heart Rhythm)。' },
  { id: '55', abbr: 'ETOH', full_name: 'Alcohol', chinese: '乙醇 (酒精)', category: 'General', layman_term: '指酒精 (Alcohol)，通常指喝酒或者酒精中毒。' },
  { id: '56', abbr: 'FBC', full_name: 'Full Blood Count', chinese: '全血细胞计数', category: 'Procedure', layman_term: '最基础的抽血化验，看红细胞（贫血 Anemia）、白细胞（感染 Infection）和血小板。' },
  { id: '57', abbr: 'GA', full_name: 'General Anaesthetic', chinese: '全身麻醉', category: 'Procedure', layman_term: '彻底睡过去的麻醉 (Sleep)，手术期间啥都不知道，需要机器帮忙呼吸。' },
  { id: '58', abbr: 'GCS', full_name: 'Glasgow Coma Scale', chinese: '格拉斯哥昏迷量表', category: 'General', layman_term: '医生用来打分的，看病人昏迷程度 (Coma)，满分15分就是清醒，分数越低越严重。' },
  { id: '59', abbr: 'Hb', full_name: 'Haemoglobin', chinese: '血红蛋白', category: 'General', layman_term: '血色素，低了就是贫血 (Anemia)，高了血太稠。' },
  { id: '60', abbr: 'ICC', full_name: 'Intercostal Catheter', chinese: '肋间导管 (胸腔引流管)', category: 'Procedure', layman_term: '在肋骨之间插根管子 (Tube) 进胸腔，把积气或积水排出来。' },
  { id: '61', abbr: 'IV', full_name: 'Intravenous', chinese: '静脉内', category: 'General', layman_term: '打点滴，输液 (Drip)。' },
  { id: '62', abbr: 'LFT', full_name: 'Liver Function Tests', chinese: '肝功能检查', category: 'Procedure', layman_term: '抽血看看肝脏 (Liver) 工作正不正常。' },
  { id: '63', abbr: 'LOC', full_name: 'Level of Consciousness', chinese: '意识水平', category: 'General', layman_term: '指病人清不清醒 (Conscious)，有没有昏迷。' },
  { id: '64', abbr: 'MBA', full_name: 'Motor Bike Accident', chinese: '摩托车事故', category: 'General', layman_term: '骑摩托车 (Motorbike) 撞了。' },
  { id: '65', abbr: 'MSU', full_name: 'Midstream Urine', chinese: '中段尿', category: 'Procedure', layman_term: '接尿化验的时候，前后的尿不要，只要中间那一截 (Midstream)，比较干净。' },
  { id: '66', abbr: 'MVA', full_name: 'Motor Vehicle Accident', chinese: '机动车事故', category: 'General', layman_term: '出车祸了 (Car Accident)。' },
  { id: '67', abbr: 'NGF', full_name: 'Nasogastric Feeds', chinese: '鼻胃管喂养', category: 'Management', layman_term: '因为吃不下饭，通过插在鼻子里的管子 (Tube) 打流食进去。' },
  { id: '68', abbr: 'OA', full_name: 'Osteoarthritis', chinese: '骨关节炎', category: 'Diagnosis', layman_term: '关节老化磨损了 (Wear and Tear)，长骨刺了，最常见的关节炎。' },
  { id: '69', abbr: 'OT', full_name: 'Operating Theatre', chinese: '手术室', category: 'General', layman_term: '做手术的地方 (Surgery)。也可能指 Occupational Therapy (职业治疗)，看具体语境。' }
];