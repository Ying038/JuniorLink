import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Switch, SafeAreaView, StatusBar, Image, 
  ActivityIndicator, Modal, Dimensions, FlatList, Platform,
  Animated, Easing // <--- ADDED THESE
} from 'react-native';
import { 
  Lock, User, Shield, Camera, Fingerprint, CheckCircle, 
  ChevronLeft, Settings, LogOut, Utensils, 
  Bus, EyeOff, CreditCard, Cpu, Nfc, Ticket, PieChart, 
  Gamepad2, BookOpen, Bell, Globe, MessageSquare, 
  FileText, HelpCircle, Instagram, Users, Heart,
  Delete, X, Trophy, Calendar, MapPin, Edit3, DollarSign, AlertTriangle, ScanFace, Check, ShoppingBag, ChevronRight, Smile, Flag
} from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'expo-linear-gradient';

// Screen Dimensions
const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#EBF5FF',        
  primary: '#5B9EE1',   
  primaryDark: '#2563EB',
  white: '#FFFFFF',
  text: '#1F2937',
  textLight: '#6B7280', 
  success: '#10B981',   
  danger: '#EF4444', 
  warning: '#F59E0B',   
};

// --- GLOBAL STATE TYPES ---
type DatabaseState = {
    foodSpent: number;
    travelSpent: number;
    othersSpent: number;
    
    foodLimit: number;
    travelLimit: number;
    othersLimit: number;
    
    blockSocial: boolean;
    limitGaming: boolean;
};

// --- REUSABLE COMPONENT: CLASSIC MALAYSIAN MYKAD STYLE ---
const SmartIDCard = ({ onPress, style }: any) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[smartStyles.cardContainerShadow, style]}>
            <LinearGradient 
                // Classic MyKad Turquoise Gradient
                colors={['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1']} 
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                style={smartStyles.idCardContainer}
            >
                {/* Background Pattern Overlay (Simulated) */}
                <View style={smartStyles.patternOverlay} />

                {/* --- HEADER ROW --- */}
                <View style={smartStyles.cardHeaderRow}>
                    <View>
                        <Text style={smartStyles.headerTextSmall}>KAD PENGENALAN</Text>
                        <Text style={smartStyles.headerTextLarge}>MALAYSIA</Text>
                    </View>
                    <View style={smartStyles.flagContainer}>
                         {/* MyKad Logo Placeholder */}
                         <View style={{marginRight: 8, alignItems:'center'}}>
                            <Text style={{fontSize: 10, fontWeight:'bold', color:'#005b96', fontStyle:'italic'}}>MyKad</Text>
                         </View>
                         {/* Malaysia Flag Representation */}
                         <View style={{width: 24, height: 14, backgroundColor:'#010066', borderWidth:1, borderColor:'#ddd', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:8}}>🇲🇾</Text>
                         </View>
                    </View>
                </View>

                {/* --- CONTENT ROW --- */}
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    
                    {/* LEFT COLUMN: CHIP & DETAILS */}
                    <View style={{flex: 1.4, paddingRight: 5}}>
                        {/* IC Number */}
                        <Text style={smartStyles.icNumber}>121212-12-1212</Text>

                        {/* Gold Chip */}
                        <View style={smartStyles.chipBox}>
                            <View style={smartStyles.chipInner} />
                        </View>

                        {/* Details */}
                        <View style={{marginTop: 10}}>
                            <Text style={smartStyles.nameLabel}>LEE WEI JIE</Text>
                            
                            <Text style={smartStyles.addressLabel}>
                                NO. 12, JALAN DAMAI 1,{'\n'}
                                TAMAN SERI BAHAGIA,{'\n'}
                                43000 KAJANG,{'\n'}
                                SELANGOR
                            </Text>
                        </View>
                    </View>

                    {/* RIGHT COLUMN: PHOTO */}
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={smartStyles.photoFrame}>
                            {/* Cartoon Avatar */}
                            <Image source={{uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Lee'}} style={smartStyles.photoImage}/>
                        </View>
                        <Text style={smartStyles.warganegaraLabel}>WARGANEGARA</Text>
                    </View>
                </View>

                 {/* BOTTOM RIGHT GHOST IMAGE / LOGO */}
                 <View style={{position:'absolute', bottom: 10, right: 10, opacity: 0.3}}>
                    <Shield size={40} color="#005b96" />
                 </View>

            </LinearGradient>
        </TouchableOpacity>
    );
};

// --- 1. LOGIN SCREEN ---
const LoginScreen = ({ nav }: any) => {
    const [showBioModal, setShowBioModal] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanSuccess, setScanSuccess] = useState(false);

    const handleLoginPress = () => {
        setShowBioModal(true);
    };

    const handleBiometricScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setScanSuccess(true);
            setTimeout(() => {
                setShowBioModal(false);
                setScanSuccess(false);
                nav('dashboard');
            }, 800);
        }, 1500);
    };

    return (
    <View style={styles.fullScreen}>
      <View style={styles.headerContainer}><Shield size={80} color={COLORS.primary} fill="#D1E9FF" /></View>
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={styles.subtitle}>Login using your MyKid / IC Number</Text>
        <View style={styles.inputBox}><CreditCard color={COLORS.textLight} size={20} /><TextInput style={styles.input} placeholder="Identity Card No." placeholderTextColor={COLORS.textLight} keyboardType="numeric"/></View>
        <View style={styles.inputBox}><Lock color={COLORS.textLight} size={20} /><TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor={COLORS.textLight} /><EyeOff color={COLORS.textLight} size={20} /></View>
        
        <TouchableOpacity style={styles.btnPrimary} onPress={handleLoginPress}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
        
        <View style={{flexDirection:'row', marginTop: 20}}>
            <Text style={{color: COLORS.textLight, fontSize: 14}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => nav('signup')}><Text style={{color: COLORS.primary, fontWeight:'bold', fontSize: 14}}>Sign up</Text></TouchableOpacity>
        </View>
      </View>

      <Modal visible={showBioModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Verify Identity</Text>
                <Text style={styles.modalSub}>Touch sensor to verify ID</Text>
                <TouchableOpacity onPress={handleBiometricScan} disabled={isScanning || scanSuccess} style={styles.bioIconContainer}>
                    {isScanning ? <ActivityIndicator size="large" color={COLORS.primary} /> : 
                     scanSuccess ? <CheckCircle size={80} color={COLORS.success} /> : 
                     <Fingerprint size={80} color={COLORS.primary} />}
                </TouchableOpacity>
                <Text style={{marginTop: 20, color: COLORS.textLight}}>{isScanning ? "Scanning..." : scanSuccess ? "Verified!" : "Tap icon to scan"}</Text>
                <TouchableOpacity onPress={() => setShowBioModal(false)} style={{marginTop: 20}}><Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}}>Cancel</Text></TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  );
};

// --- 2. SIGN UP FLOW (UPDATED: LIVE PREVIEW & ANIMATED FACE SCAN) ---
const SignUpFlow = ({ nav }: any) => {
    // 0 = Register Form, 1 = ID Scan, 2 = Face, 3 = Fingerprint, 4 = Success
    const [step, setStep] = useState(0); 

    // Camera State
    const [cameraOpen, setCameraOpen] = useState(false);
    const [idCaptured, setIdCaptured] = useState(false);
    
    // Face Scan State
    const [faceScanning, setFaceScanning] = useState(false);
    const [faceScanSuccess, setFaceScanSuccess] = useState(false);

    // Animation for Face Scan Line
    const scanLineAnim = React.useRef(new Animated.Value(0)).current;

    const startFaceScan = () => {
        setFaceScanning(true);
        // Animate the scan line moving down and up
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
                Animated.timing(scanLineAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
            ])
        ).start();

        // Simulate success after 3 seconds
        setTimeout(() => {
            setFaceScanning(false);
            setFaceScanSuccess(true);
            setTimeout(() => {
                setStep(3); // Go to Fingerprint
            }, 1000);
        }, 3500);
    };

    // Step 0: Register Form
    const StepRegister = () => (
        <View style={{flex: 1}}>
             <View style={styles.headerContainer}>
                <User size={80} color={COLORS.primary} />
            </View>
            <View style={styles.bottomSheet}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Enter your details to register</Text>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <View style={[styles.inputBox, {flex: 0.48}]}>
                        <User color={COLORS.textLight} size={20} />
                        <TextInput style={styles.input} placeholder="First Name" placeholderTextColor={COLORS.textLight} />
                    </View>
                    <View style={[styles.inputBox, {flex: 0.48}]}>
                        <User color={COLORS.textLight} size={20} />
                        <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor={COLORS.textLight} />
                    </View>
                </View>

                <View style={styles.inputBox}>
                    <CreditCard color={COLORS.textLight} size={20} />
                    <TextInput style={styles.input} placeholder="IC Number" placeholderTextColor={COLORS.textLight} keyboardType="numeric"/>
                </View>

                <View style={styles.inputBox}>
                    <Lock color={COLORS.textLight} size={20} />
                    <TextInput style={styles.input} placeholder="Create Password" secureTextEntry placeholderTextColor={COLORS.textLight} />
                    <EyeOff color={COLORS.textLight} size={20} />
                </View>

                <TouchableOpacity style={styles.btnPrimary} onPress={() => setStep(1)}>
                    <Text style={styles.btnText}>Continue</Text>
                    <ChevronRight color="white" size={20} style={{position: 'absolute', right: 20}}/>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Step 1: ID Card (Live Preview -> Capture)
    const StepID = () => {
        const handleCapture = () => {
            setIdCaptured(true); // Freeze the view
        };

        const confirmCapture = () => {
            setCameraOpen(false); // Close camera
            setStep(2); // Go to Face Scan
        };

        // 1. Instructions Screen
        if (!cameraOpen) {
            return (
                <View style={{flex:1, alignItems:'center', justifyContent:'center', padding: 20}}>
                    <View style={{width: 80, height: 80, backgroundColor: '#DBEAFE', borderRadius: 40, alignItems:'center', justifyContent:'center', marginBottom: 20}}>
                        <CreditCard size={40} color={COLORS.primary} />
                    </View>
                    <Text style={{fontSize: 22, fontWeight:'bold', color: COLORS.text, marginBottom: 10}}>Scan Photo ID</Text>
                    <Text style={{color: COLORS.textLight, textAlign: 'center', marginBottom: 40}}>
                        We need to scan your MyKad to verify your identity.
                    </Text>
                    
                    <TouchableOpacity onPress={() => { setIdCaptured(false); setCameraOpen(true); }} style={styles.btnPrimary}>
                        <Camera color="white" size={24} style={{marginRight: 10}}/>
                        <Text style={styles.btnText}>Open Camera</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        // 2. Camera View
        return (
            <View style={styles.cameraContainer}>
                <View style={styles.cameraHeader}>
                    <TouchableOpacity onPress={() => setCameraOpen(false)}><X color="white" size={30} /></TouchableOpacity>
                    <Text style={{color:'white', fontSize: 16, fontWeight:'bold'}}>Scan ID Front</Text>
                    <View style={{width: 30}} />
                </View>

                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white', marginBottom: 20, opacity: 0.8}}>
                        {idCaptured ? "Processing..." : "Align ID within the frame"}
                    </Text>
                    
                    <View style={styles.cameraFrame}>
                        {/* THE ID CARD IS VISIBLE HERE BEFORE SNAP */}
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', overflow:'hidden'}}>
                             <SmartIDCard style={{transform: [{scale: 0.82}]}} />
                             
                             {/* Optional: Dark Overlay before capture to simulate "Preview" vs "Captured" */}
                             {!idCaptured && <View style={{position:'absolute', top:0, bottom:0, left:0, right:0, backgroundColor:'rgba(0,0,0,0.1)'}} />}
                        </View>

                        {/* Corner Markers */}
                        <View style={[styles.cornerMarker, {top:0, left:0, borderTopWidth: 4, borderLeftWidth: 4}]} />
                        <View style={[styles.cornerMarker, {top:0, right:0, borderTopWidth: 4, borderRightWidth: 4}]} />
                        <View style={[styles.cornerMarker, {bottom:0, left:0, borderBottomWidth: 4, borderLeftWidth: 4}]} />
                        <View style={[styles.cornerMarker, {bottom:0, right:0, borderBottomWidth: 4, borderRightWidth: 4}]} />
                    </View>
                </View>

                <View style={styles.cameraFooter}>
                    {!idCaptured ? (
                        <TouchableOpacity onPress={handleCapture} style={styles.shutterBtnOuter}>
                            <View style={styles.shutterBtnInner} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => setIdCaptured(false)} style={{padding: 15}}>
                                <Text style={{color:'white', fontSize: 16}}>Retake</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmCapture} style={{backgroundColor:'white', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25}}>
                                <Text style={{color:'black', fontWeight:'bold', fontSize: 16}}>Use Photo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    // Step 2: Face Recognition (Selfie Cam + Animation)
    const StepFace = () => {
        // Interpolate animation value for the scan line movement
        const translateY = scanLineAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-10, 200] // Moves down 200 units
        });

        return (
            <View style={styles.cameraContainer}>
                <View style={styles.cameraHeader}>
                    <TouchableOpacity onPress={() => setStep(1)}><ChevronLeft color="white" size={30} /></TouchableOpacity>
                    <Text style={{color:'white', fontSize: 16, fontWeight:'bold'}}>Face Verification</Text>
                    <View style={{width: 30}} />
                </View>

                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color:'white', marginBottom: 30, fontSize: 18, fontWeight:'bold'}}>
                        {faceScanning ? "Verifying..." : faceScanSuccess ? "Verified!" : "Position your face"}
                    </Text>

                    {/* CIRCULAR SELFIE FRAME */}
                    <View style={{
                        width: 280, height: 280, borderRadius: 140, 
                        borderWidth: 5, borderColor: faceScanSuccess ? COLORS.success : 'white',
                        overflow: 'hidden', backgroundColor: '#333',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        {/* THE CARTOON AVATAR */}
                        <Image 
                            source={{uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Lee'}} 
                            style={{width: 240, height: 240}}
                        />

                        {/* SCANNING LASER OVERLAY */}
                        {faceScanning && (
                            <Animated.View style={{
                                position: 'absolute',
                                width: '100%', height: 4,
                                backgroundColor: COLORS.primary,
                                shadowColor: COLORS.primary, shadowOpacity: 1, shadowRadius: 10,
                                transform: [{ translateY }]
                            }} />
                        )}

                        {/* SUCCESS CHECKMARK OVERLAY */}
                        {faceScanSuccess && (
                            <View style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(16, 185, 129, 0.6)', alignItems:'center', justifyContent:'center'}}>
                                <CheckCircle size={80} color="white" />
                            </View>
                        )}
                    </View>
                    
                    <Text style={{color: 'rgba(255,255,255,0.7)', marginTop: 20, textAlign:'center', width: '70%'}}>
                        {faceScanning ? "Please hold still while we scan your face." : "Ensure your face is within the circle."}
                    </Text>
                </View>

                <View style={styles.cameraFooter}>
                    {!faceScanning && !faceScanSuccess && (
                        <TouchableOpacity onPress={startFaceScan} style={styles.btnPrimary}>
                            <ScanFace color="white" size={20} style={{marginRight: 10}}/>
                            <Text style={styles.btnText}>Start Scan</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    // Step 3: Fingerprint (No changes)
    const StepFinger = () => (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize: 22, fontWeight:'bold', color: COLORS.text, marginBottom: 10}}>Set Your Fingerprint</Text>
            <TouchableOpacity onPress={() => setStep(4)} style={{marginVertical: 60}}>
                <Fingerprint size={150} color="#5B9EE1" /> 
            </TouchableOpacity>
            <Text style={{color: COLORS.textLight}}>Tap to register fingerprint.</Text>
        </View>
    );

    // Step 4: Success (No changes)
    const StepSuccess = () => (
        <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent:'center', alignItems:'center'}}>
            <View style={styles.modalContent}>
                <CheckCircle color={COLORS.success} size={60} style={{marginBottom: 20}}/>
                <Text style={{fontSize: 22, fontWeight:'bold', color: COLORS.text, marginBottom: 10}}>You're all set!</Text>
                <ActivityIndicator size="small" color={COLORS.primary} />
                {setTimeout(() => nav('login'), 2000) && null} 
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.fullScreen}>
             {/* Hide default header when camera is open (steps 1 & 2 use custom headers) */}
             {!cameraOpen && step !== 1 && step !== 2 && step < 4 && (
                 <View style={{paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 50 : 10}}>
                     <TouchableOpacity onPress={() => step > 0 ? setStep(step-1) : nav('login')} style={{padding: 10}}>
                         <ChevronLeft size={30} color={COLORS.text} />
                     </TouchableOpacity>
                 </View>
             )}
             
             {step === 0 && <StepRegister />}
             {step === 1 && <StepID />}
             {step === 2 && <StepFace />}
             {step === 3 && <StepFinger />}
             {step === 4 && <StepSuccess />}
        </SafeAreaView>
    );
};
// --- 3. TRAVEL PASS SCREEN (UPDATED WITH QR TIMER) ---
const TravelPassScreen = ({ nav }: any) => {
    // Timer State
    const [timeLeft, setTimeLeft] = useState(60); 
    const [isExpired, setIsExpired] = useState(false);
    const [qrValue, setQrValue] = useState(`STUDENT-${Date.now()}`);

    // Countdown Effect
    useEffect(() => {
        if (timeLeft === 0) {
            setIsExpired(true);
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    // Refresh Handler
    const handleRefresh = () => {
        setTimeLeft(60);
        setIsExpired(false);
        setQrValue(`STUDENT-${Date.now()}`);
    };

    return (
        <View style={styles.container}>
             <View style={styles.navHeader}>
                 <TouchableOpacity onPress={() => nav('dashboard')}><ChevronLeft color={COLORS.text} size={28} /></TouchableOpacity>
                 <Text style={styles.navTitle}>Travel Pass</Text>
                 <View style={{width: 28}} />
             </View>
             
             <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                 {/* QR PASS CARD */}
                 <View style={[styles.whiteCard, {alignItems:'center', paddingVertical: 40}]}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 5}}>Student Rapid Pass</Text>
                    <Text style={{color: COLORS.textLight, marginBottom: 30}}>Scan at the gate reader</Text>

                    {/* QR Code Area */}
                    <View style={{height: 200, justifyContent:'center', alignItems:'center'}}>
                        {isExpired ? (
                             <View style={{alignItems:'center'}}>
                                 <View style={{backgroundColor:'#FEE2E2', padding: 15, borderRadius: 50, marginBottom: 15}}>
                                     <AlertTriangle size={50} color={COLORS.danger} />
                                 </View>
                                 <Text style={{color: COLORS.danger, fontWeight:'bold', fontSize: 20}}>EXPIRED</Text>
                             </View>
                        ) : (
                             <View style={{borderWidth: 5, borderColor: 'white', elevation: 5, shadowColor:'#000', shadowOpacity: 0.1, borderRadius: 10}}>
                                 <QRCode value={qrValue} size={180} />
                             </View>
                        )}
                    </View>

                    {/* Timer / Refresh Button */}
                    <View style={{marginTop: 30, width: '100%', alignItems:'center'}}>
                        {isExpired ? (
                            <TouchableOpacity onPress={handleRefresh} style={[styles.btnPrimary, {width: 200, height: 45}]}>
                                <Text style={styles.btnText}>Regenerate Pass</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={{fontSize: 16, color: COLORS.text}}>
                                Valid for: <Text style={{fontWeight:'bold', color: timeLeft < 10 ? COLORS.danger : COLORS.success}}>{timeLeft}s</Text>
                            </Text>
                        )}
                    </View>
                 </View>

                 {/* INFO CARD */}
                 <View style={styles.whiteCard}>
                    <Text style={{fontWeight:'bold', fontSize: 16, marginBottom: 10}}>Pass Details</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 10, borderBottomWidth:1, borderBottomColor:'#f3f4f6', paddingBottom:10}}>
                        <Text style={{color: COLORS.textLight}}>Student ID</Text>
                        <Text style={{fontWeight:'bold', color: COLORS.text}}>121212-12-1212</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 10, borderBottomWidth:1, borderBottomColor:'#f3f4f6', paddingBottom:10}}>
                        <Text style={{color: COLORS.textLight}}>Rate Type</Text>
                        <Text style={{fontWeight:'bold', color: COLORS.primary}}>Concession (50% Off)</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color: COLORS.textLight}}>Status</Text>
                        <Text style={{fontWeight:'bold', color: COLORS.success}}>Active</Text>
                    </View>
                 </View>
             </ScrollView>
        </View>
    );
};

// --- 4. ACTIVITY & LIMITS ---
const ActivityScreen = ({ nav, db }: any) => (
    <View style={styles.container}>
        <View style={styles.navHeader}>
            <TouchableOpacity onPress={() => nav('dashboard')}><ChevronLeft color={COLORS.text} size={28} /></TouchableOpacity>
            <Text style={styles.navTitle}>Activity & Limits</Text>
            <View style={{width: 28}} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 80}}>
            <View style={styles.whiteCard}>
                 <Text style={{fontWeight:'bold', fontSize:16, marginBottom:15}}>Transactions</Text>
                 <TransactionRow icon={<Utensils size={18}/>} label="Canteen" amount={db.foodSpent} />
                 <View style={{height: 10}} />
                 <TransactionRow icon={<Bus size={18}/>} label="Travel" amount={db.travelSpent} />
                 <View style={{height: 10}} />
                 <TransactionRow icon={<ShoppingBag size={18}/>} label="Others" amount={db.othersSpent} />
            </View>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: COLORS.text}}>Weekly Limits Usage:</Text>
            <View style={styles.whiteCard}>
                <LimitBar label="Food" current={db.foodSpent} total={db.foodLimit} color={COLORS.success} />
                <View style={{height: 20}} />
                <LimitBar label="Travel" current={db.travelSpent} total={db.travelLimit} color="#A855F7" />
                <View style={{height: 20}} />
                <LimitBar label="Others" current={db.othersSpent} total={db.othersLimit} color={COLORS.warning} />
            </View>
        </ScrollView>
        <BottomNavBar nav={nav} active="activity" />
    </View>
);

const TransactionRow = ({icon, label, amount}:any) => (
    <View style={styles.timelineRow}>
        <View style={styles.iconBox}>{icon}</View>
        <View style={{flex:1, marginLeft: 15}}>
            <Text style={{fontWeight:'bold', fontSize: 16, color: COLORS.text}}>{label}</Text>
        </View>
        <Text style={[styles.boldText]}>RM{amount.toFixed(2)}</Text>
    </View>
);

const LimitBar = ({label, current, total, color}: any) => {
    const percentage = Math.min((current / total) * 100, 100);
    return (
        <View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 8}}>
                <Text style={{fontWeight:'600', color: COLORS.text}}>{label}:</Text>
                <Text style={{fontSize: 12, color: COLORS.textLight}}>RM{current.toFixed(2)} / RM{total.toFixed(2)}</Text>
            </View>
            <View style={{height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, overflow:'hidden'}}>
                <View style={{width: `${percentage}%`, height: '100%', backgroundColor: color}} />
            </View>
        </View>
    );
}

// --- 5. RESTRICTION SCREEN ---
const RestrictionScreen = ({ nav, db }: any) => (
    <View style={styles.container}>
        <View style={styles.navHeader}><Text style={[styles.navTitle, {marginLeft: 0}]}>App Restriction</Text></View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 80}}>
            <RestrictionCard 
                icon={<Instagram color="#E1306C" size={24} />} 
                title="Social Media" subtitle="e.g. Instagram, TikTok" 
                status={db.blockSocial ? "BLOCKED by Parent" : "Allowed"} 
                statusColor={db.blockSocial ? COLORS.danger : COLORS.success}
            />
            <RestrictionCard 
                icon={<Gamepad2 color="#5B9EE1" size={24} />} 
                title="Gaming Apps" subtitle="e.g. PUBG, Genshin" 
                status={db.limitGaming ? "1 hr Limit" : "Unlimited"} 
                statusColor={db.limitGaming ? COLORS.warning : COLORS.success}
            />
            <RestrictionCard 
                icon={<BookOpen color="#10B981" size={24} />} 
                title="Educational Apps" subtitle="e.g. Duolingo" 
                status="Allowed" statusColor={COLORS.success}
            />
            <View style={{paddingVertical: 20}}>
                 <TouchableOpacity onPress={() => nav('parent-verify')} activeOpacity={0.7}
                    style={{backgroundColor: '#DBEAFE', padding: 15, borderRadius: 12, alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                     <Shield size={18} color={COLORS.primaryDark} style={{marginRight: 8}}/>
                     <Text style={{color: COLORS.primaryDark, fontWeight: 'bold'}}>Parental Control Settings</Text>
                 </TouchableOpacity>
            </View>
        </ScrollView>
        <BottomNavBar nav={nav} active="restriction" />
    </View>
);

const RestrictionCard = ({icon, title, subtitle, status, statusColor}: any) => (
    <View style={styles.whiteCard}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={[styles.iconBox, {backgroundColor: 'white', borderWidth: 1, borderColor: '#eee'}]}>{icon}</View>
            <View style={{flex: 1, marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: COLORS.text}}>{title}</Text>
                <Text style={{fontSize: 12, color: COLORS.textLight}}>{subtitle}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: statusColor, marginTop: 4}}>• {status}</Text>
            </View>
        </View>
    </View>
);

// --- 6. PARENT: VERIFICATION & DASHBOARD ---

const ParentVerifyScreen = ({ nav }: any) => {
    const [pin, setPin] = useState('');
    const handlePress = (val: string) => { if(pin.length < 6) setPin(prev => prev + val); };
    const handleDelete = () => setPin(prev => prev.slice(0, -1));
    useEffect(() => { if(pin === '123456') { setTimeout(() => { setPin(''); nav('parent'); }, 300); } }, [pin]);

    return (
        <View style={styles.centerScreen}>
            <TouchableOpacity onPress={() => nav('dashboard')} style={{position:'absolute', top: 50, left: 20}}><X color={COLORS.text} size={30} /></TouchableOpacity>
            <Shield size={50} color={COLORS.primaryDark} style={{marginBottom: 20}} />
            <Text style={styles.title}>Parent Verification</Text>
            <Text style={styles.subtitle}>Enter PIN (123456)</Text>
            <View style={{flexDirection:'row', marginBottom: 40, height: 20}}>
                {[...Array(6)].map((_, i) => (<View key={i} style={{width: 15, height: 15, borderRadius: 10, backgroundColor: i < pin.length ? COLORS.primary : '#E5E7EB', marginHorizontal: 5}} />))}
            </View>
            <View style={{width: '80%', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', gap: 20}}>
                {[1,2,3,4,5,6,7,8,9].map(n => (<TouchableOpacity key={n} onPress={() => handlePress(n.toString())} style={styles.pinBtn}><Text style={styles.pinText}>{n}</Text></TouchableOpacity>))}
                <View style={styles.pinBtnEmpty} /><TouchableOpacity onPress={() => handlePress('0')} style={styles.pinBtn}><Text style={styles.pinText}>0</Text></TouchableOpacity><TouchableOpacity onPress={handleDelete} style={styles.pinBtn}><Delete size={24} color={COLORS.text} /></TouchableOpacity>
            </View>
        </View>
    );
};

const ParentScreen = ({ nav, db, setDb }: any) => {
    const updateLimit = (type: 'food' | 'travel' | 'others', val: string) => {
        const num = parseFloat(val) || 0;
        if(type === 'food') setDb((prev:any) => ({...prev, foodLimit: num}));
        if(type === 'travel') setDb((prev:any) => ({...prev, travelLimit: num}));
        if(type === 'others') setDb((prev:any) => ({...prev, othersLimit: num}));
    };
    const toggleRestriction = (type: 'social' | 'game') => {
        setDb((prev: any) => ({ ...prev, [type === 'social' ? 'blockSocial' : 'limitGaming']: !prev[type === 'social' ? 'blockSocial' : 'limitGaming'] }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.navHeader}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Shield color={COLORS.primaryDark} size={28} />
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 18, fontWeight:'bold', color: COLORS.primaryDark}}>Parent Dashboard</Text>
                        <Text style={{fontSize: 12, color: COLORS.textLight}}>Child: Lee Wei Jie</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.blueCard, {height: 100, flexDirection:'row', alignItems:'center', marginBottom: 20}]}>
                    <View style={{flex:1}}><Text style={{color:'white', fontWeight:'bold', fontSize: 18}}>Controls Active</Text></View>
                    <CheckCircle color="white" size={32} />
                </View>
                <Text style={{fontSize: 16, fontWeight:'bold', marginBottom: 15, color: COLORS.text}}>Spending Limits</Text>
                <View style={styles.whiteCard}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 15}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.iconBox, {backgroundColor:'#DCFCE7'}]}><Utensils size={20} color={COLORS.success}/></View>
                            <Text style={{marginLeft: 10, fontWeight:'600'}}>Food Limit</Text>
                        </View>
                        <View style={styles.inputLimitBox}>
                             <TextInput style={{fontWeight:'bold', fontSize: 16, minWidth: 40, textAlign:'right'}} keyboardType="numeric" defaultValue={db.foodLimit.toString()} onChangeText={(t) => updateLimit('food', t)}/>
                             <Edit3 size={14} color={COLORS.textLight} style={{marginLeft: 5}}/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 15}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.iconBox, {backgroundColor:'#F3E8FF'}]}><Bus size={20} color="#A855F7"/></View>
                            <Text style={{marginLeft: 10, fontWeight:'600'}}>Travel Limit</Text>
                        </View>
                        <View style={styles.inputLimitBox}>
                             <TextInput style={{fontWeight:'bold', fontSize: 16, minWidth: 40, textAlign:'right'}} keyboardType="numeric" defaultValue={db.travelLimit.toString()} onChangeText={(t) => updateLimit('travel', t)}/>
                             <Edit3 size={14} color={COLORS.textLight} style={{marginLeft: 5}}/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.iconBox, {backgroundColor:'#FEF3C7'}]}><ShoppingBag size={20} color={COLORS.warning}/></View>
                            <Text style={{marginLeft: 10, fontWeight:'600'}}>Others Limit</Text>
                        </View>
                        <View style={styles.inputLimitBox}>
                             <TextInput style={{fontWeight:'bold', fontSize: 16, minWidth: 40, textAlign:'right'}} keyboardType="numeric" defaultValue={db.othersLimit.toString()} onChangeText={(t) => updateLimit('others', t)}/>
                             <Edit3 size={14} color={COLORS.textLight} style={{marginLeft: 5}}/>
                        </View>
                    </View>
                </View>
                <Text style={{fontSize: 16, fontWeight:'bold', marginTop: 10, marginBottom: 15, color: COLORS.text}}>App Restrictions</Text>
                <View style={styles.whiteCard}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 20}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.iconBox, {backgroundColor:'#FEE2E2'}]}><Instagram size={20} color={COLORS.danger}/></View>
                            <Text style={{marginLeft: 15, fontWeight:'600', fontSize: 16}}>Block Social</Text>
                        </View>
                        <Switch value={db.blockSocial} onValueChange={() => toggleRestriction('social')} trackColor={{false: '#E5E7EB', true: COLORS.danger}}/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.iconBox, {backgroundColor:'#FEF3C7'}]}><Gamepad2 size={20} color={COLORS.warning}/></View>
                            <Text style={{marginLeft: 15, fontWeight:'600', fontSize: 16}}>Limit Gaming</Text>
                        </View>
                        <Switch value={db.limitGaming} onValueChange={() => toggleRestriction('game')} trackColor={{false: '#E5E7EB', true: COLORS.warning}}/>
                    </View>
                </View>
                <TouchableOpacity onPress={() => nav('dashboard')} style={{marginTop: 30, backgroundColor: 'white', padding: 15, borderRadius: 15, flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth: 1, borderColor: '#eee'}}>
                    <LogOut size={20} color={COLORS.text} />
                    <Text style={{marginLeft: 10, fontWeight:'bold', color: COLORS.text}}>Return to Student View</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

// --- 7. FUNCTIONAL CONTENT SCREENS ---
const LibraryScreen = ({ nav }: any) => (
    <View style={styles.container}>
        <View style={styles.navHeader}><TouchableOpacity onPress={()=>nav('dashboard')}><ChevronLeft size={28} color={COLORS.text}/></TouchableOpacity><Text style={styles.navTitle}>Library</Text><View style={{width:28}}/></View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontWeight:'bold', fontSize: 18, marginBottom: 15}}>Borrowed Books</Text>
            {[
                {id:1, title: 'Intro to Physics', due: 'Due: 12 Dec', color: '#DBEAFE'},
                {id:2, title: 'History of Malaysia', due: 'Due: 15 Dec', color: '#FEF3C7'},
            ].map(book => (
                <View key={book.id} style={[styles.whiteCard, {flexDirection:'row', alignItems:'center'}]}>
                    <View style={{width: 50, height: 70, backgroundColor: book.color, borderRadius: 5, marginRight: 15}} />
                    <View><Text style={{fontWeight:'bold', fontSize: 16}}>{book.title}</Text><Text style={{color: COLORS.danger, fontSize: 12, marginTop: 5}}>{book.due}</Text></View>
                </View>
            ))}
        </ScrollView>
    </View>
);

const ResultScreen = ({ nav }: any) => (
    <View style={styles.container}>
        <View style={styles.navHeader}><TouchableOpacity onPress={()=>nav('dashboard')}><ChevronLeft size={28} color={COLORS.text}/></TouchableOpacity><Text style={styles.navTitle}>Results</Text><View style={{width:28}}/></View>
        <ScrollView>
            <View style={[styles.blueCard, {height: 150, justifyContent:'center', alignItems:'center', marginBottom: 20}]}>
                <Trophy color="white" size={40} />
                <Text style={{color:'white', fontSize: 32, fontWeight:'bold', marginTop: 10}}>GPA: 3.85</Text>
                <Text style={{color:'white', opacity:0.8}}>Semester 1, 2024</Text>
            </View>
            <View style={styles.whiteCard}>
                <View style={styles.resultRow}><Text style={{flex:1}}>Mathematics</Text><Text style={{fontWeight:'bold', color: COLORS.success}}>A+</Text></View>
                <View style={styles.resultRow}><Text style={{flex:1}}>Physics</Text><Text style={{fontWeight:'bold', color: COLORS.success}}>A</Text></View>
                <View style={styles.resultRow}><Text style={{flex:1}}>History</Text><Text style={{fontWeight:'bold', color: COLORS.primary}}>A-</Text></View>
                <View style={styles.resultRow}><Text style={{flex:1}}>English</Text><Text style={{fontWeight:'bold', color: COLORS.success}}>A+</Text></View>
            </View>
        </ScrollView>
    </View>
);

const ClubScreen = ({ nav }: any) => (
    <View style={styles.container}>
        <View style={styles.navHeader}><TouchableOpacity onPress={()=>nav('dashboard')}><ChevronLeft size={28} color={COLORS.text}/></TouchableOpacity><Text style={styles.navTitle}>Clubs</Text><View style={{width:28}}/></View>
        <ScrollView>
            <Text style={{fontWeight:'bold', fontSize: 18, marginBottom: 15}}>My Clubs</Text>
            <View style={styles.whiteCard}>
                 <View style={{flexDirection:'row', marginBottom: 10}}>
                     <View style={[styles.iconBox, {backgroundColor:'#E0E7FF'}]}><Cpu color={COLORS.primary} size={24}/></View>
                     <View style={{marginLeft: 15}}><Text style={{fontWeight:'bold', fontSize: 16}}>Robotics Club</Text><Text style={{color: COLORS.textLight, fontSize: 12}}>Member since 2023</Text></View>
                 </View>
                 <View style={{flexDirection:'row', alignItems:'center', marginTop: 10}}><Calendar size={14} color={COLORS.textLight} /><Text style={{fontSize: 12, color: COLORS.textLight, marginLeft: 5}}>Next meeting: Wed, 2:00 PM</Text></View>
                 <View style={{flexDirection:'row', alignItems:'center', marginTop: 5}}><MapPin size={14} color={COLORS.textLight} /><Text style={{fontSize: 12, color: COLORS.textLight, marginLeft: 5}}>Science Lab 2</Text></View>
            </View>
        </ScrollView>
    </View>
);

// --- 8. DASHBOARD (UPDATED: NFC MODE) ---
const DashboardScreen = ({ nav, updateDb, db }: any) => {
    // We replaced the 'payModal' with 'nfcScanVisible'
    const [nfcScanVisible, setNfcScanVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('food');
    
    // Feedback Modals
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // --- NEW: NFC SIMULATION LOGIC ---
    const startNfcPayment = (type: string) => {
        setSelectedType(type);
        setNfcScanVisible(true); // Show "Scanning..."

        // Simulate 2-second scanning delay
        setTimeout(() => {
            // 1. Generate Random Amount based on type
            // Food: RM 3.00 to RM 15.00
            // Others: RM 5.00 to RM 50.00
            let min = type === 'food' ? 3 : 5;
            let max = type === 'food' ? 15 : 50;
            const randomCost = (Math.random() * (max - min) + min).toFixed(2);
            const cost = parseFloat(randomCost);

            // 2. Check Limits
            let limit = 0;
            let spent = 0;
            
            if (type === 'food') { limit = db.foodLimit; spent = db.foodSpent; }
            else if (type === 'others') { limit = db.othersLimit; spent = db.othersSpent; }

            // 3. Close Scanning Modal
            setNfcScanVisible(false);

            // 4. Validate Transaction
            if (spent + cost > limit) {
                setErrorText(`Limit Reached! Transaction of RM${cost.toFixed(2)} declined.`);
                setErrorVisible(true);
            } else {
                updateDb(type, cost);
                setSuccessMsg(`Paid RM ${cost.toFixed(2)}`);
                setSuccessVisible(true);
            }

        }, 2000); // 2 seconds delay
    };

    return (
    <View style={styles.container}>
        <View style={styles.navHeader}><Text style={{fontWeight:'bold', fontSize: 24, color: COLORS.text}}>Hi, Lee!</Text></View>
        <ScrollView contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
            {/* 1. ID CARD */}
            <SmartIDCard onPress={() => {}} style={{marginTop: 10}} />

            {/* 2. BIG BUTTON: CANTEEN (Triggers NFC) */}
            <TouchableOpacity onPress={() => startNfcPayment('food')} style={styles.bigBlueButton}>
                <View style={styles.bigIconCircle}><Utensils size={32} color={COLORS.primary}/></View>
                <View style={{marginLeft: 15}}>
                    <Text style={styles.bigBtnTitle}>School Canteen Pay</Text>
                    <Text style={styles.bigBtnSub}>Tap to Pay (NFC)</Text>
                </View>
                <View style={{marginLeft:'auto', opacity: 0.5}}><Nfc size={24} color={COLORS.text}/></View>
            </TouchableOpacity>

            {/* 3. BIG BUTTON: TRAVEL (Standard Nav) */}
            <TouchableOpacity onPress={() => nav('travel')} style={styles.bigBlueButton}>
                <View style={styles.bigIconCircle}><Bus size={32} color={COLORS.primary}/></View>
                <View style={{marginLeft: 15}}>
                    <Text style={styles.bigBtnTitle}>Travel Pass</Text>
                    <Text style={styles.bigBtnSub}>Bus / Train Tap-On</Text>
                </View>
            </TouchableOpacity>

            {/* 4. BIG BUTTON: OTHERS (Triggers NFC) */}
            <TouchableOpacity onPress={() => startNfcPayment('others')} style={styles.bigBlueButton}>
                <View style={styles.bigIconCircle}><ShoppingBag size={32} color={COLORS.primary}/></View>
                <View style={{marginLeft: 15}}>
                    <Text style={styles.bigBtnTitle}>Others Payment</Text>
                    <Text style={styles.bigBtnSub}>Stationery, Fees, etc.</Text>
                </View>
                <View style={{marginLeft:'auto', opacity: 0.5}}><Nfc size={24} color={COLORS.text}/></View>
            </TouchableOpacity>

            {/* 5. QUICK ACCESS ROW */}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 15, color: COLORS.text}}>Quick Access</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                 <MenuIcon icon={<BookOpen color={COLORS.primary} size={24}/>} label="Library" onPress={() => nav('library')} />
                 <MenuIcon icon={<FileText color={COLORS.primary} size={24}/>} label="Result" onPress={() => nav('result')} />
                 <MenuIcon icon={<Users color={COLORS.primary} size={24}/>} label="Clubs" onPress={() => nav('clubs')} />
            </View>
        </ScrollView>
        
        {/* --- NEW: NFC SCANNING MODAL --- */}
        <Modal visible={nfcScanVisible} transparent animationType="fade">
            <View style={styles.nfcOverlay}>
                <View style={styles.nfcCard}>
                    {/* Animated Pulsing Effect (Simulated via Views) */}
                    <View style={styles.pulseOuter}>
                        <View style={styles.pulseInner}>
                            <Nfc size={60} color="white" />
                        </View>
                    </View>
                    
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 30}}>Scanning...</Text>
                    <Text style={{color: 'rgba(255,255,255,0.8)', marginTop: 10}}>Hold device near terminal</Text>
                    
                    <ActivityIndicator size="large" color="white" style={{marginTop: 30}} />
                </View>
            </View>
        </Modal>

        {/* CUSTOM ERROR MODAL */}
        <Modal visible={errorVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, {alignItems:'center'}]}>
                    <View style={{width:50, height:50, borderRadius:25, backgroundColor:'#FEE2E2', alignItems:'center', justifyContent:'center', marginBottom:15}}>
                        <AlertTriangle color={COLORS.danger} size={30} />
                    </View>
                    <Text style={styles.modalTitle}>Transaction Declined</Text>
                    <Text style={{textAlign:'center', color:COLORS.textLight, marginBottom:20}}>{errorText}</Text>
                    <TouchableOpacity onPress={()=>setErrorVisible(false)} style={[styles.btnPrimary, {backgroundColor: COLORS.danger}]}>
                        <Text style={styles.btnText}>Okay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        {/* CUSTOM SUCCESS MODAL */}
        <Modal visible={successVisible} transparent animationType="fade">
            <View style={styles.bottomModalOverlay}>
                <View style={styles.bottomModalContent}>
                    <View style={{width:60, height:60, borderRadius:30, backgroundColor:'#D1FAE5', alignItems:'center', justifyContent:'center', marginBottom:15}}>
                        <CheckCircle color={COLORS.success} size={35} />
                    </View>
                    <Text style={styles.modalTitle}>Payment Approved</Text>
                    <Text style={{textAlign:'center', color: COLORS.text, marginBottom:20, fontSize: 28, fontWeight:'bold'}}>
                        {successMsg}
                    </Text>
                    <View style={{backgroundColor:'#F3F4F6', padding: 10, borderRadius: 10, marginBottom: 20}}>
                        <Text style={{color: COLORS.textLight, fontSize: 12}}>Merchant: {selectedType === 'food' ? "SMK Canteen" : "General Store"}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>setSuccessVisible(false)} style={styles.btnPrimary}>
                        <Text style={styles.btnText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

      <BottomNavBar nav={nav} active="dashboard" />
  </View>
  );
};

const MenuIcon = ({icon, label, onPress}: any) => (
    <TouchableOpacity onPress={onPress} style={{alignItems:'center', width: 70}}>
        <View style={styles.iconCircle}>{icon}</View>
        <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
);

// --- 9. SETTINGS SCREEN ---
const SettingsScreen = ({ nav }: any) => (
    <View style={styles.container}>
        <View style={styles.navHeader}>
            <TouchableOpacity onPress={() => nav('dashboard')}><ChevronLeft color={COLORS.text} size={28} /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 80}}>
            <View style={{alignItems:'center', marginBottom: 20}}>
                <View style={styles.avatarCircle}><User size={50} color="white" /></View>
                <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 10, color: COLORS.text}}>Lee</Text>
                <Text style={{color: COLORS.textLight, fontSize: 16}}>121212-12-1212</Text>
            </View>
            <View style={{height: 1, backgroundColor: '#E5E7EB', width: '100%', marginBottom: 10}} />
            <MenuItem icon={<User size={22} color={COLORS.text}/>} label="Edit Profile" />
            <MenuItem icon={<Bell size={22} color={COLORS.text}/>} label="Notifications" />
            <MenuItem icon={<Globe size={22} color={COLORS.text}/>} label="Language" />
            <MenuItem icon={<MessageSquare size={22} color={COLORS.text}/>} label="Feedback" />
            <MenuItem icon={<Lock size={22} color={COLORS.text}/>} label="Privacy Policy" />
            <MenuItem icon={<Heart size={22} color={COLORS.text}/>} label="Help & Support" />
            <MenuItem icon={<Settings size={22} color={COLORS.text}/>} label="Settings" />
            <TouchableOpacity onPress={() => nav('login')} style={{flexDirection:'row', alignItems:'center', paddingVertical: 15, paddingHorizontal: 10}}>
                <LogOut size={22} color={COLORS.danger} />
                <Text style={{fontSize: 16, marginLeft: 15, color: COLORS.danger}}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
        <BottomNavBar nav={nav} active="settings" />
    </View>
);

const MenuItem = ({icon, label}: any) => (
    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', paddingVertical: 15, paddingHorizontal: 10}}>
        {icon}
        <Text style={{fontSize: 16, marginLeft: 15, color: COLORS.text, flex: 1}}>{label}</Text>
    </TouchableOpacity>
);

// --- SHARED BOTTOM NAV BAR ---
const BottomNavBar = ({ nav, active }: any) => {
    const isActive = (name: string) => active === name ? COLORS.primary : "#9CA3AF";
    const isProfileActive = active === 'settings';

    return (
        <View style={styles.bottomNavContainer}>
            <TouchableOpacity onPress={() => nav('dashboard')}><PieChart color={isActive('dashboard')} size={24} /></TouchableOpacity>
            <TouchableOpacity onPress={() => nav('travel')}><Ticket color={isActive('travel')} size={24} /></TouchableOpacity>
            <TouchableOpacity onPress={() => nav('activity')}><PieChart color={isActive('activity')} size={24} /></TouchableOpacity>
            <TouchableOpacity onPress={() => nav('restriction')}><Shield color={isActive('restriction')} size={24} /></TouchableOpacity>
            <View>
                <TouchableOpacity onPress={() => nav('settings')}>
                    <User color={isActive('settings')} size={24} />
                    {isProfileActive && <View style={{position:'absolute', bottom: -5, alignSelf:'center', width:4, height:4, borderRadius:2, backgroundColor: COLORS.danger}} />}
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- MAIN NAVIGATOR ---
export default function Index() {
  const [screen, setScreen] = useState('login'); 
  
  // Weekly limits: 200, 100, 200
  const [db, setDb] = useState<DatabaseState>({
      foodSpent: 0,
      travelSpent: 0,
      othersSpent: 0,
      foodLimit: 200.00,
      travelLimit: 100.00, 
      othersLimit: 200.00,
      blockSocial: true,
      limitGaming: true,
  });

  const updateDb = (type: string, amount: number) => {
      setDb(prev => ({
          ...prev,
          foodSpent: type === 'food' ? prev.foodSpent + amount : prev.foodSpent,
          travelSpent: type === 'travel' ? prev.travelSpent + amount : prev.travelSpent,
          othersSpent: type === 'others' ? prev.othersSpent + amount : prev.othersSpent,
      }));
  };

  const renderScreen = () => {
    switch(screen) {
        case 'login': return <LoginScreen nav={setScreen} />;
        case 'signup': return <SignUpFlow nav={setScreen} />;
        case 'dashboard': return <DashboardScreen nav={setScreen} updateDb={updateDb} db={db} />;
        case 'travel': return <TravelPassScreen nav={setScreen} updateDb={updateDb} db={db} />;
        case 'activity': return <ActivityScreen nav={setScreen} db={db} />;
        case 'restriction': return <RestrictionScreen nav={setScreen} db={db} />;
        case 'settings': return <SettingsScreen nav={setScreen} />;
        case 'library': return <LibraryScreen nav={setScreen} />;
        case 'result': return <ResultScreen nav={setScreen} />;
        case 'clubs': return <ClubScreen nav={setScreen} />;
        case 'parent-verify': return <ParentVerifyScreen nav={setScreen} />;
        case 'parent': return <ParentScreen nav={setScreen} db={db} setDb={setDb} />; 
        default: return <LoginScreen nav={setScreen} />;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bg}}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}

// --- GENERAL STYLES ---
const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: COLORS.bg },
  centerScreen: { flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 20, paddingTop: 60, paddingBottom: 0 }, 
  headerContainer: { height: '25%', justifyContent: 'center', alignItems: 'center' },
  
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 5 },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginBottom: 30 },
  navHeader: { flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', marginBottom: 20 },
  navTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', flex:1 },

  bottomSheet: { backgroundColor: 'white', flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, alignItems: 'center', width: '100%', elevation: 10 },
  
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 14, paddingHorizontal: 15, marginBottom: 15, width: '100%', height: 55 },
  input: { flex: 1, marginLeft: 12, color: COLORS.text, fontSize: 16 },
  btnPrimary: { backgroundColor: COLORS.primary, width: '100%', height: 55, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  
  // NEW: Overlay specifically for bottom popups
  bottomModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  
  // NEW: Content style that auto-sizes height (no flex: 1)
  bottomModalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, paddingBottom: 50, alignItems: 'center', width: '100%', elevation: 10 },
  modalContent: { backgroundColor: 'white', width: width * 0.85, padding: 30, borderRadius: 25, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  modalSub: { color: COLORS.textLight, marginBottom: 20, fontSize: 14 },
  bioIconContainer: { padding: 25, borderRadius: 60, backgroundColor: '#F3F4F6' },
  captureBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent:'center', alignItems:'center', marginTop: 30 },
  
  iconCircle: { width: 50, height: 50, backgroundColor: 'white', borderRadius: 15, justifyContent:'center', alignItems:'center', marginBottom: 5 },
  iconLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.text },
  
  whiteCard: { backgroundColor: 'white', borderRadius: 20, padding: 20, marginBottom: 20, width: '100%' },
  timelineRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, backgroundColor: '#F3F4F6', borderRadius: 10, justifyContent:'center', alignItems:'center' },
  boldText: { fontWeight: 'bold', fontSize: 14, color: COLORS.text },
  subText: { fontSize: 12, color: COLORS.textLight },

  blueCard: { backgroundColor: COLORS.primary, height: 200, borderRadius: 20, padding: 20, width: '100%', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 },
  
  bottomNavContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 30, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 0, left: 0, right: 0, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },

  pinBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', justifyContent:'center', alignItems:'center', borderWidth: 1, borderColor: '#eee'},
  pinBtnEmpty: { width: 70, height: 70 },
  pinText: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  inputLimitBox: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, flexDirection:'row', alignItems:'center' },

  catBtn: { flex: 1, padding: 15, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems:'center', flexDirection:'row', justifyContent:'center' },
  catBtnActive: { backgroundColor: COLORS.primary },
  catText: { fontWeight:'bold', marginLeft: 8, color: COLORS.text },

  resultRow: { flexDirection:'row', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingVertical: 12 },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#4B5563', justifyContent:'center', alignItems:'center' },

  // Big Dashboard Buttons
  bigBlueButton: { backgroundColor: '#BFDBFE', padding: 20, borderRadius: 20, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  bigIconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', justifyContent:'center', alignItems: 'center' },
  bigBtnTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  bigBtnSub: { fontSize: 14, color: '#4B5563' },

  nfcOverlay: { 
      flex: 1, 
      backgroundColor: 'rgba(0,0,0,0.85)', // Dark background like a screen focus
      justifyContent: 'center', 
      alignItems: 'center' 
  },
  nfcCard: { 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100%' 
  },
  pulseOuter: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: 'rgba(91, 158, 225, 0.2)', // Faint blue outer ring
      justifyContent: 'center',
      alignItems: 'center'
  },
  pulseInner: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: COLORS.primary, // Solid blue circle
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 10
  },

  // Add inside styles = StyleSheet.create({ ... })

  // --- CAMERA DEMO STYLES ---
  cameraContainer: {
      flex: 1,
      backgroundColor: 'black',
      width: '100%',
      height: '100%',
      position: 'absolute', // Covers entire screen
      top: 0,
      left: 0,
      zIndex: 50
  },
  cameraHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'android' ? 50 : 50,
      paddingBottom: 20,
  },
  cameraFrame: {
      width: width * 0.9,
      height: (width * 0.9) * 0.63, // Aspect ratio of ID card
      borderRadius: 15,
      position: 'relative',
      // We don't use borderColor here, we use corner markers for the "viewfinder" look
  },
  cornerMarker: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderColor: 'white',
      borderRadius: 4
  },
  cameraFooter: {
      height: 120,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 20
  },
  shutterBtnOuter: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 4,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
  },
  shutterBtnInner: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: 'white'
  }
});

// MALAYSIAN IC CARD STYLES
const smartStyles = StyleSheet.create({
    cardContainerShadow: { width: '100%', height: 250, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 15, backgroundColor: 'transparent', marginBottom: 20 },
    idCardContainer: { flex: 1, borderRadius: 20, overflow: 'hidden', position: 'relative', padding: 20 },
    
    // Transparent Pattern Overlay for Texture
    patternOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundColor: 'transparent', zIndex: 0 },
    
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    headerTextSmall: { fontSize: 10, color: '#333', fontWeight: 'bold', letterSpacing: 0.5 },
    headerTextLarge: { fontSize: 22, color: '#333', fontWeight: '900', letterSpacing: 1 },
    
    flagContainer: { flexDirection: 'row', alignItems: 'center' },
    
    icNumber: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 10 },
    
    chipBox: { width: 45, height: 35, backgroundColor: '#d4af37', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    chipInner: { width: 30, height: 20, borderWidth: 1, borderColor: '#b8860b', borderRadius: 2 },
    
    nameLabel: { fontSize: 16, fontWeight: '900', color: '#000', marginBottom: 4 },
    addressLabel: { fontSize: 9, fontWeight: '600', color: '#333', maxWidth: 180, lineHeight: 12 },
    
    photoFrame: { width: 90, height: 110, backgroundColor: '#ddd', borderRadius: 4, borderWidth: 1, borderColor: '#fff', overflow: 'hidden', marginBottom: 5 },
    photoImage: { width: '100%', height: '100%' },
    
    warganegaraLabel: { fontSize: 10, fontWeight: 'bold', color: '#000' }
});