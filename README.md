# Advanced-Fermantation-Controller
The Advanced Fermantation Controller (AFC) is a system to automatically control the wort temperature and density during fermentation and let you monitor any fermentation parameter remotelly.

# How does it works
The system is made up of :
- a control unit (CU), based on the ESP32 MCU
- a wireless multisensor, capable to measure both temperature and tilt
- one or two additional probes (wireless too?)

The CU reads periodically the wort temperature and tilt of the wireless probe, in order to estimate the wort density, and the temperature of the fermentation chamber. Based on the fermentation profile, the current wort temperature and the set point temperature, the CU will acts on the cooling or heating system to keep the correct temp.
